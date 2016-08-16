var w;

function startWorker(){
	if(typeof(Worker)!=="undefined"){
		if(typeof(w)=="undefined"){
			w=new Worker("demo_workers.js");

		}
		w.onmessage=function(event){
			//document.getElementById("result").innerHTML=event.data;
			console.log(event.data);
		};
	}else{
		console.log("Sorry, your browser doesn't support web Worker!");
	}
}

function stopWorker(){
	w.terminate();
	w=undefined;
}


startWorker();