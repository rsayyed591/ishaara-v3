"use client"

import React, { useRef, useEffect, useState } from "react"
import Webcam from "react-webcam"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Play, Square, CameraOff } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"

const PROJECT_URL = "isl-actions"
const MODEL_VERSION = 3

export default function TranslatePage() {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [inferRunning, setInferRunning] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [model, setModel] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detectedVariables, setDetectedVariables] = useState("")
  const [responser, setResponser] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modeVar, setModeVar] = useState("")
  const [isCameraOn, setIsCameraOn] = useState(false)
  const counter = useRef(0)

  let prevs: string[] = []
  let cache: { [key: string]: number } = {}
  let freq: { [key: number]: string } = {}
  let res = ""
  let arrres: string[] = []

  const startInfer = () => {
    setInferRunning(true)
    if (typeof window !== "undefined" && window.roboflow) {
      window.roboflow
        .auth({
          publishable_key: process.env.NEXT_PUBLIC_ROBOFLOW_API_KEY,
        })
        .load({
          model: PROJECT_URL,
          version: MODEL_VERSION,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          onMetadata: function (_m: any) {
            console.log("model loaded")
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((loadedModel: any) => {
          setModel(loadedModel)
        })
    }
  }

  useEffect(() => {
    if (inferRunning && model) {
      const inferInterval = setInterval(() => {
        detect(model)
      }, 10)

      return () => clearInterval(inferInterval)
    }
  }, [inferRunning, model])

  const stopInfer = () => {
    setInferRunning(false)
    if (model) model.teardown()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detect = async (model: any) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      video.width = videoWidth
      video.height = videoHeight

      adjustCanvas(videoWidth, videoHeight)

      const detections = await model.detect(video)

      const formattedDetections = formatDetections(detections)
      if (formattedDetections) {
        prevs.push(formattedDetections)

        if (formattedDetections in cache) {
          cache[formattedDetections] += 1
        } else {
          cache[formattedDetections] = 1
        }
        // eslint-disable-next-line prefer-const
        for (let key in cache) {
          freq[cache[key]] = key
        }
        const last = Object.keys(freq)[Object.keys(freq).length - 1]
        if (counter.current % 3 === 0) {
          counter.current += 1
          res += `${freq[last]} `
          arrres.push(freq[last])
          cache = {}
          freq = {}

          setModeVar(res)
        }
      }
      setDetectedVariables((prev) => prev + formattedDetections)
      if (formattedDetections && prevs[prevs.length - 1] !== prevs[prevs.length - 2]) {
        counter.current++
      }

      if (arrres.length >= 4) {
        counter.current = 0
        geminiNeta(res)
        arrres = []
      }

      const ctx = canvasRef.current?.getContext("2d")
      if (ctx) drawBoxes(detections, ctx)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDetections = (detections: any[]) => {
    let formatted = ""
    detections.forEach((variable) => {
      formatted += `${variable.class}, `
    })
    return formatted
  }

  const adjustCanvas = (w: number, h: number) => {
    if (canvasRef.current) {
      canvasRef.current.width = w * window.devicePixelRatio
      canvasRef.current.height = h * window.devicePixelRatio

      canvasRef.current.style.width = w + "px"
      canvasRef.current.style.height = h + "px"

      const ctx = canvasRef.current?.getContext("2d")
      if (!ctx) return; 
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const drawBoxes = (detections: any[], ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    detections.forEach((row) => {
      if (row.confidence < 0) return

      const x = row.x - row.width / 2
      const y = row.y - row.height / 2
      const w = row.width
      const h = row.height

      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = row.color
      ctx.rect(x, y, w, h)
      ctx.stroke()

      ctx.fillStyle = "black"
      ctx.globalAlpha = 0.2
      ctx.fillRect(x, y, w, h)
      ctx.globalAlpha = 1.0

      const fontSize = 12
      ctx.font = `${fontSize}px monospace`
      ctx.textAlign = "center"
      const classTxt = row.class

      ctx.strokeStyle = row.color
      ctx.fillStyle = row.color
      ctx.fillRect(
        x - ctx.lineWidth / 2,
        y - fontSize - ctx.lineWidth,
        w + ctx.lineWidth,
        fontSize + ctx.lineWidth
      )
      ctx.stroke()
      ctx.fillStyle = "white"
      ctx.fillText(classTxt, x + w / 2, y - 1)
    })
  }

  const geminiNeta = async (words: string) => {
    const formdata = new FormData()
    formdata.append("text", words)

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GEMINI_API_URL || "", {
        method: "POST",
        body: formdata,
      })
      const result = await response.json()
      setResponser(result["data"])
    } catch (error) {
      console.error(error)
    }

    prevs = []
    res = ""
    setModeVar(res)
    setDetectedVariables("")
  }

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn)
    if (inferRunning) {
      stopInfer()
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-primary inline-block">Sign Language Translator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Video Capture
              <div className="flex items-center space-x-2">
                <span>{isCameraOn ? 'On' : 'Off'}</span>
                <Switch
                  checked={isCameraOn}
                  onCheckedChange={toggleCamera}
                  aria-label="Toggle camera"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {isCameraOn && (
                <>
                  <Webcam
                    ref={webcamRef}
                    muted={true}
                    videoConstraints={{ width: 640, height: 480 }}
                    className="rounded-lg"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 rounded-lg"
                  />
                </>
              )}
              {!isCameraOn && (
                <div className="w-full h-[480px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <CameraOff className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Position yourself in front of the camera</li>
                <li>Click the &quot;Start&quot; button to begin sign language detection</li>
                <li>Perform sign language gestures clearly</li>
                <li>View the translated text in the box below</li>
                <li>Click &quot;Stop&quot; when you&apos;re finished</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Translation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={responser}
                placeholder="Translation will appear here..."
                readOnly
                className="h-32"
              />
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={inferRunning ? stopInfer : startInfer} 
                  variant={inferRunning ? "destructive" : "default"}
                  disabled={!isCameraOn}
                >
                  {inferRunning ? (
                    <>
                      <Square className="mr-2 h-4 w-4" /> Stop
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Start
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Alert className="mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          The model is sensitive and may lead to incorrect predictions in suboptimal conditions.
        </AlertDescription>
      </Alert>
    </div>
  )
}

