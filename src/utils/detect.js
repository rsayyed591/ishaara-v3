import * as tf from "@tensorflow/tfjs"
import { renderBoxes } from "./renderBox"
import labels from "./labels.json"

const numClass = labels.length

const preprocess = (source, modelWidth, modelHeight) => {
  let xRatio, yRatio

  const input = tf.tidy(() => {
    const img = tf.browser.fromPixels(source)
    const [h, w] = img.shape.slice(0, 2)
    const maxSize = Math.max(w, h)
    const imgPadded = img.pad([
      [0, maxSize - h],
      [0, maxSize - w],
      [0, 0],
    ])

    xRatio = maxSize / w
    yRatio = maxSize / h

    return tf.image.resizeBilinear(imgPadded, [modelWidth, modelHeight]).div(255.0).expandDims(0)
  })

  return [input, xRatio, yRatio]
}

export const detect = async (source, model, canvasRef, callback = () => {}, onLabelDetected = () => {}) => {
  if (!model || !model.net || !model.inputShape || model.inputShape.length < 3) {
    console.error("Model input shape is invalid")
    return
  }

  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3)

  const tensors = []
  try {
    const [input, xRatio, yRatio] = preprocess(source, modelWidth, modelHeight)
    tensors.push(input)

    const res = await model.net.executeAsync(input)
    tensors.push(res)

    const transRes = tf.tidy(() => {
      return Array.isArray(res) ? res[0].transpose([0, 2, 1]) : res.transpose([0, 2, 1])
    })
    tensors.push(transRes)

    let boxes, scores, classes
    ;[boxes, scores, classes] = tf.tidy(() => {
      const w = transRes.slice([0, 0, 2], [-1, -1, 1])
      const h = transRes.slice([0, 0, 3], [-1, -1, 1])
      const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2))
      const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2))

      const boxes = tf.concat([y1, x1, tf.add(y1, h), tf.add(x1, w)], 2).squeeze()

      const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0)
      return [boxes, rawScores.max(1), rawScores.argMax(1)]
    })
    tensors.push(boxes, scores, classes)

    const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2)
    tensors.push(nms)

    // Gather data while tensors are still valid
    const boxes_data = boxes.gather(nms, 0).dataSync()
    const scores_data = scores.gather(nms, 0).dataSync()
    const classes_data = classes.gather(nms, 0).dataSync()

    console.log("Detected boxes:", boxes_data)
    console.log("Detected scores:", scores_data)
    console.log("Detected classes:", classes_data)

    renderBoxes(canvasRef, boxes_data, scores_data, classes_data, [xRatio, yRatio])

    // Call the onLabelDetected callback with the highest confidence label
    if (classes_data.length > 0) {
      const highestConfidenceIndex = scores_data.indexOf(Math.max(...scores_data))
      const detectedLabel = labels[classes_data[highestConfidenceIndex]]
      onLabelDetected(detectedLabel)
    }

    callback()
  } catch (error) {
    console.error("Detection error:", error)
  } finally {
    // Clean up tensors
    tensors.forEach((tensor) => {
      if (tensor && tensor.dispose) {
        tensor.dispose()
      }
    })
  }
}

export const detectVideo = (vidSource, model, canvasRef, onLabelDetected) => {
  let isRunning = true
  let frameId = null

  const detectFrame = async () => {
    if (!isRunning) return

    if (!vidSource || vidSource.videoWidth === 0 || vidSource.srcObject === null) {
      const ctx = canvasRef.getContext("2d")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      frameId = requestAnimationFrame(detectFrame)
      return
    }

    try {
      await detect(
        vidSource,
        model,
        canvasRef,
        () => {},
        (label) => {
          console.log("Detected label:", label)
          onLabelDetected(label)
        },
      )
    } catch (error) {
      console.error("Frame detection error:", error)
    }

    frameId = requestAnimationFrame(detectFrame)
  }

  detectFrame()

  return () => {
    isRunning = false
    if (frameId) {
      cancelAnimationFrame(frameId)
    }
  }
}

