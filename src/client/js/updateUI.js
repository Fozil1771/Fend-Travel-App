import { performance } from "./app"

//Updating ui
export const updateUI = async() => {
    const req = await fetch('http://localhost:8080/getData')
   
    try {

        const data = await req.json();

        document.getElementById('printable').classList.remove("visible")
        //showing the date
        let date = new Date();
        let date1 = new Date(document.getElementById('dateTime').value);
        let date2 = new Date(document.getElementById('endTime').value);
        let dateBefore = Math.abs(date1 - date);
        let diffTime = Math.abs(date2 - date);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        let diffBefore =  Math.ceil(dateBefore / (1000 * 60 * 60 * 24)); 

        document.getElementById('dateLeft').innerHTML ='Departure after: ' + diffBefore + ' days';
        document.getElementById('dateInfo').innerHTML ='Trip: ' + (diffDays-diffBefore) + ' days';
        document.getElementById('destination').innerHTML = 'City: '+data.name
        document.getElementById('content').innerHTML = 'Country: '+data.countryName;
        document.getElementById('temperature').innerHTML = 'Temperature: '+data.temp+'\u00B0'+'C';
        document.getElementById('weatherInfo').innerHTML = 'Info: '+data.description;
        document.getElementById('weatherPres').innerHTML = 'Pressure: '+data.pres;
        document.getElementById('image').innerHTML = `<img class="img-thumbnail img-fluid" src=${data.largeImageURL} alt=${data.name}>`;
        document.getElementById('print').classList.remove("visible")
      
      
    } catch (error) {
        alert('Something went wrong!\n Make sure you entered correct info')
    }
}

// Making a pdf to print the trip
document.getElementById('print').addEventListener('click', tripPdf)
async function tripPdf(e) {
    e.preventDefault();
    
    let doc = new jsPDF('p', 'mm', [400, 400]);
    let output = document.getElementById("printable");
    let specialElementHandlers = {
        '#bypassme': function(element, renderer) {
          return true;
         }
      };
    doc.fromHTML(output, 0,0, {
        'width': 200,
        'elementHandlers': specialElementHandlers
    },()=>{
        doc.save("trip.pdf")
    })
}