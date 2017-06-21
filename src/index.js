import { predictFile } from './prediction'

const THRESHOLD = 0.9

window.addEventListener('DOMContentLoaded', () => {
  // grab references to all DOM elements needed
  const camera = document.querySelector('video')
  const canvas = document.querySelector('canvas')
  const footer = document.querySelector('footer')

  // get a context for the canvas
  const context = canvas.getContext('2d')

  // determine if the browser supports the HTML5 camera API
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      camera.src = window.URL.createObjectURL(stream)
      camera.play()

      // set the aspect ratio for the canvas
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
                if (prediction.Tag === 'hotdog' && prediction.Probability > THRESHOLD) {
                  document.querySelector('header').style.background = 'rgba(34, 139, 34, 0.7)'
                  document.querySelector('h1').textContent = 'Hotdog!'
                } else {
                  document.querySelector('header').style.background = 'rgba(173, 16, 47, 0.7)'
                  document.querySelector('h1').textContent = 'Not Hotdog!'
                }
              }, err => {
                console.log('Error', err.response)
              })
            })
          })

          canvas.addEventListener('click', () => {
            context.clearRect(0, 0, canvas.width, canvas.height)

            document.querySelector('header').style.background = 'rgba(0, 0, 0, 0.8)'
            document.querySelector('h1').textContent = 'SeeFood'
            canvas.removeEventListener('click')
          })
        })

        // only show the camera controls once the camera is initialized
        footer.style.display = 'flex'
      })
    })
  }
})
