//Fuction to read the json file and create two plots: a bar chart and a bubble chart
function getPlots(id) {
  
  //Read samples.json
      d3.json("samples.json").then (sampledata =>{
          console.log(sampledata)
          var ids = sampledata.samples[0].otu_ids;

          console.log(ids)
          var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();

          console.log(sampleValues)
          var labels =  sampledata.samples[0].otu_labels.slice(0,10);

          console.log (labels)
          
      // get Top 10 otu ids and reverse it
          var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();

      // get the otu id's to the desired form for the plot
          var OTU_id = OTU_top.map(d => "OTU " + d);
          console.log(`OTU IDS: ${OTU_id}`)

      // get the top 10 labels for the plot
          var labels =  sampledata.samples[0].otu_labels.slice(0,10);
          console.log(`OTU_labels: ${labels}`)
          var trace = {
              x: sampleValues,
              y: OTU_id,
              text: labels,
              marker: {
              color: 'blue'},
              type:"bar",
              orientation: "h",
          };
      // create data variable
          var data = [trace];
  
      // create layout variable to set plots layout
          var layout = {
              yaxis:{
                  tickmode:"linear",
              },
              margin: {
                  l: 75,
                  r: 75,
                  t: 75,
                  b: 30
              }
          };
  
  // create the bar plot
      Plotly.newPlot("bar", data, layout);
          
      //bubble plot
      var trace1 = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text:  sampledata.samples[0].otu_labels
    };
  
      //layout for the bubble plot
          var layout_2 = {
              xaxis:{title: "OTU ID"},
              height: 600,
              width: 1000
          };
  
      //create data variable 
          var data1 = [trace1];
  
      //create the bubble plot
      Plotly.newPlot("bubble", data1, layout_2); 
      });
  }

//create the function to get the necessary data
  function getDemoInfo(id) {

    //read the json file to get data
      d3.json("samples.json").then((data)=> {

      //get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
        //filter meta data info by id
         var result = metadata.filter(meta => meta.id.toString() === id)[0];
        
         //select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       //empty info panel
         demographicInfo.html("");
  
       //grab the necessary info for the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }
  //function for the change event
  function optionChanged(id) {
      getPlots(id);
      getDemoInfo(id);
  }
  
  //initial data rendering
  function init() {
      //select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      //read the data 
      d3.json("samples.json").then((data)=> {
          console.log(data)
  
          //get the id data to the dropdown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          //display the page
          getPlots(data.names[0]);
          getDemoInfo(data.names[0]);
      });
  }
  
  init();