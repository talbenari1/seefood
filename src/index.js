import { predictFile } from './prediction'
import { THRESHOLD } from '../config'

window.addEventListener('DOMContentLoaded', () => {
  // grab references to all DOM elements needed
  const camera = document.querySelector('video')
  const canvas = document.querySelector('canvas')
  const footer = document.querySelector('footer')
  const header = document.querySelector('header')
  const h1 = header.querySelector('h1')

  // get a context for the canvas
  const context = canvas.getContext('2d')

  // determine if the browser supports the HTML5 camera API
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // get the best video stream available on the device
    // TODO: replace with enumerateDevices()
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      camera.src = window.URL.createObjectURL(stream)
      camera.play()

      // add a hook to check when the camera feed starts
      camera.addEventListener('canplay', () => {
        // once the video element has a feed, the canvas can be set to
        // cover the same region as the camera's dimensions
        canvas.width = camera.videoWidth
        canvas.height = camera.videoHeight

        // define the image capture action
        document.getElementById('take-picture').addEventListener('click', () => {
          window.requestAnimationFrame(() => {
            // take a picture and draw it on the canvas
            context.drawImage(camera, 0, 0, camera.videoWidth, camera.videoHeight)

            // convert the image to binary data
            canvas.toBlob(blob => {
              // call the prediction API with the image
              predictFile(blob).then(data => {
                const prediction = data.body.Predictions[0]

                // perform a simple prediction check and set the banner accordingly
                prediction.Tag === 'hotdog' && prediction.Probability > THRESHOLD
                  ? setHeader('rgba(34, 139, 34, 0.7)', 'Hotdog!')
                  : setHeader('rgba(173, 16, 47, 0.7)', 'Not Hotdog!')
              }, err => {
                // there was something wrong with the API call
                console.error(err.response)
              })
            })
          })

          // reset the app when the image is clicked
          canvas.addEventListener('click', () => {
            // remove the image and reset the header
            context.clearRect(0, 0, canvas.width, canvas.height)
            setHeader('rgba(0, 0, 0, 0.8)', 'SeeFood')

            // clear the click handler
            canvas.removeEventListener('click')
          })
        })

        // only show the camera controls once the camera is initialized
        footer.style.display = 'flex'
      })
    }, err => {
      console.error(err)
    })
  }

  const setHeader = (background, text) => {
    window.requestAnimationFrame(() => {
      header.style.background = background
      h1.textContent = text
    })
  }
})
