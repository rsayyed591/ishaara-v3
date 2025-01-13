"use client"

import React, { useState, useEffect, useRef } from "react"
import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-backend-webgl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlertCircle, Play, Square, Camera, CameraOff } from 'lucide-react'
import Loader from "@/components/Loader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { detect, detectVideo } from "@/utils/detect"
import { Webcam } from "@/utils/webcam"

export default function TranslatePage() {
  const [loading, setLoading] = useState({ loading: true, progress: 0 })
  const [model, setModel] = useState<{
    net: tf.GraphModel | null,
    inputShape: number[],
  }>({
    net: null,
    inputShape: [1, 0, 0, 3],
  })
  const [inferRunning, setInferRunning] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(false)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [translation, setTranslation] = useState("")
  const [error, setError] = useState("")
  const [stopDetection, setStopDetection] = useState<(() => void) | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const webcamInstance = useRef(new Webcam())

  useEffect(() => {
    tf.ready().then(async () => {
      try {
        const yolov8 = await tf.loadGraphModel(
          `https://29b6-43-231-238-206.ngrok-free.app/ws`,
          {
            onProgress: (fractions) => {
              setLoading({ loading: true, progress: fractions })
            },
          }
        )
        const inputShape = yolov8.inputs[0].shape || [1, 224, 224, 3] // Default shape if undefined
        const dummyInput = tf.ones(inputShape)
        const warmupResults = yolov8.execute(dummyInput)

        setLoading({ loading: false, progress: 1 })
        setModel({
          net: yolov8,
          inputShape: yolov8.inputs[0].shape || [1, 224, 224, 3],
        })

        tf.dispose([warmupResults, dummyInput])
      } catch (error) {
        console.error('Error loading model:', error)
        setError('Failed to load the model. Please refresh the page and try again.')
        setLoading({ loading: false, progress: 0 })
      }
    })
  }, [])

  useEffect(() => {
    const updateCanvasSize = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current
        const canvas = canvasRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }
    }

    if (isCameraOn && videoRef.current) {
      videoRef.current.addEventListener('loadeddata', updateCanvasSize)
      window.addEventListener('resize', updateCanvasSize)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', updateCanvasSize)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isCameraOn])

  const toggleCamera = async () => {
    if (isCameraOn) {
      if (videoRef.current) {
        webcamInstance.current.close(videoRef.current)
      }
      setIsCameraOn(false)
      if (inferRunning) {
        stopInfer()
      }
    } else {
      try {
        // Define constraints for front camera
        const constraints = {
          video: {
            facingMode: "user", // Front camera
          },
        }
  
        // Access the media stream
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
  
        if (videoRef.current) {
          // Assign the stream to the video element's srcObject
          videoRef.current.srcObject = stream
        } else {
          throw new Error("Video element not found")
        }
  
        setIsCameraOn(true)
        setError("")
      } catch (err) {
        console.error("Error opening camera:", err)
        setError("Failed to open camera. Please check your camera permissions.")
      }
    }
  }
  
    
  const startInfer = () => {
    try {
      setInferRunning(true)
      const stopFn = detectVideo(videoRef.current, model, canvasRef.current)
      setStopDetection(() => stopFn)
    } catch (error) {
      console.error('Error starting inference:', error)
      setError('Failed to start inference. Please try again.')
      setInferRunning(false)
    }
  }

  const stopInfer = () => {
    setInferRunning(false)
    if (stopDetection) {
      stopDetection()
      setStopDetection(null)
    }
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
  }

  useEffect(() => {
    return () => {
      if (stopDetection) {
        stopDetection()
      }
    }
  }, [stopDetection])

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8 pb-2 border-b border-primary">Sign Language Translator</h1>
      {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Section - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <Card className="border-2 border-white/10">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Video Capture
                <div className="flex items-center gap-2">
                  <span className="text-sm">{isCameraOn ? 'On' : 'Off'}</span>
                  <Switch
                    checked={isCameraOn}
                    onCheckedChange={toggleCamera}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className={`absolute inset-0 w-full h-full object-contain ${isCameraOn ? 'block' : 'hidden'}`}
                  autoPlay
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className={`absolute inset-0 w-full h-full object-contain ${isCameraOn ? 'block' : 'hidden'}`}
                  style={{ transform: 'translateY(-4px)' }} // Adjust detection box position
                />
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CameraOff className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side Section */}
        <div className="space-y-6">
          {/* Instructions Section */}
          <Card className="border-2 border-yellow-500/30">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
            <ol className="space-y-2 text-sm">
  <li>1. Position yourself in front of the camera</li>
  <li>2. Click the &quot;Start&quot; button to begin sign language detection</li>
  <li>3. Perform sign language gestures clearly</li>
  <li>4. View the translated text in the box below</li>
  <li>5. Click &quot;Stop&quot; when you&apos;re finished</li>
</ol>
            </CardContent>
          </Card>

          {/* Translation Section */}
          <Card className="border-2 border-green-500/30">
            <CardHeader>
              <CardTitle>Translation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={translation}
                placeholder="Translation will appear here..."
                readOnly
                className="h-32 bg-black/20"
              />
              <div className="flex justify-center">
                <Button 
                  onClick={inferRunning ? stopInfer : startInfer} 
                  variant={inferRunning ? "destructive" : "default"}
                  disabled={!isCameraOn}
                  className="w-full"
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
    </div>
  )
}

