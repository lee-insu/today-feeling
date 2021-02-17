const URL = "https://teachablemachine.withgoogle.com/models/ajfH_-5E0/";
    
        let model, webcam, labelContainer, maxPredictions;
    
        // Load the image model and setup the webcam
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // or files from your local hard drive
            // Note: the pose library adds "tmImage" object to your window (window.tmImage)
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"));
            }
        }
    
        // run the webcam image through the image model
        async function predict() {
            // predict can take in an image, video or canvas html element
            let image = document.querySelector("#face-image")
            const prediction = await model.predict(image, false);
            prediction.sort((a,b) => parseFloat(b.probability) - parseFloat(a.probability));
            let resultTitle, resultExplain, resultCause,resultSol;

        switch(prediction[0].className) {
            case "기쁨" :
            resultTitle = "기쁨"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            case "까칠" :
            resultTitle = "까칠"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            case "놀람" :
            resultTitle = "놀람"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            case "분노" :
            resultTitle = "분노"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            case "소심" :
            resultTitle = "panic"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            case "슬픔" :
            resultTitle = "슬픔"
            resultExplain = "explain"
            resultCause = "cause"
            resultSol = "sol"
            break;

            default:
             resultTitle = "un"
             resultExplain = "un"
             resultCause = "unf"
             resultSol = "un"
             break;
        }
        console.log(prediction)
        let title = `<div class= '${prediction[0].className}-feeling-title'> ${resultTitle}</div>`;
        let explain = `<div class='${prediction[0].className}-explain'> ${resultExplain}</div>`;
        let cause = `<div class ='${prediction[0].className}-cause'> ${resultCause}</dlv>`;
        let sol = `<div class ='${prediction[0].className}-sol'> ${resultSol}</div>`;
        let pushResult = document.querySelector('.push-result');
        $('.push-result').html(title + explain + cause + sol);
        let barWidth;
        for (let i = 0; i < maxPredictions; i++) {
            if(prediction[i].probability.toFixed(2) > 0.1) {
                barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
            } else if (prediction[i].probability.toFixed(2) >= 0.01) {
                barWidth = "4%"
            }else {
                barWidth= "2%"
            }

            let labelTitle;
            switch (prediction[i].className) { 
                case "기쁨":
                labelTitle = "기쁨"
                break;

                case "까칠":
                labelTitle = "까칠"
                break;

                case "놀람":
                labelTitle = "놀람"
                break;

                case "분노":
                labelTitle = "분노"
                break;

                case "소심":
                labelTitle = "소심"
                break;

                case "슬픔":
                labelTitle = "슬픔"
                break;

                default:
                labelTitle = "dun"
                break;
            }
            console.log(barWidth);
            let label = `<div class ='feeling-label'> ${labelTitle} </div>`
            let bar = `<div class ='bar-container><div class='${prediction[i].className}-box'></div><div class='align-center ${prediction[i].className}-bar' style='width:${barWidth}'><span class ='percent-text'>${Math.round(prediction[i].probability.toFixed(2) * 100)}%</span></div></div>`;
            labelContainer.childNodes[i].innerHTML = label + bar;


        }

    }