var assunto_span = document.getElementsByClassName("assunto");
var tempo = document.getElementsByClassName("tempo");
var li = document.getElementsByTagName("li");
var remetente = document.getElementsByClassName("nome");
var novaLista = "<ul class='list-group'>";
var orde = 0;
var dataorde = 0;

function ordenar() {
	if (orde == 0) {


		// Pegando os textos de assunto
		var so_texto = [];
		so_texto = pegaTexto(assunto_span);


		// Excluindo os textos repetidos
		var diferentes_assunto;
		diferentes_assunto = retornaDif(so_texto);

		//console.log(so_texto);

		//var tamanho_li = li.length;

		// for pra pegar a posição do so_texto
		for (var i = 0; i < diferentes_assunto.length; i++) {
			var aux = [];
			// for para pegar o li 
			for (var j = 0; j < so_texto.length; j++) {
				//console.log();
				if (diferentes_assunto[i] == so_texto[j]) {
					aux.push(j);
				}
				//li[j].getElementsByClassName("remetente").textContent;
			}

			//ordeno o vetor com assuntos iguais pela data/hora
			aux = ordenaData(aux);
			console.log("vou add na lista");
			novaLista += "<li class='list-group-item'><h4><span>" + so_texto[aux[0]] + "</span></h4>"
			for (var c = 0; c < aux.length; c += 1) {
				novaLista += "<p><span>" + remetente[aux[c]].textContent + "</span>";
				novaLista += "<span>" + tempo[aux[c]].textContent + "</span> </p>";
				//novaLista+= "<span>" + li[aux[i]].getElementsByClassName("tempo").textContent + "</span></p></li>"; 
			}
			//console.log(aux);
		}

		novaLista += "</ul>";
		document.getElementById("novo").innerHTML = novaLista;
		orde = 1;
	} else {
		alert("Lista já ordenada");
	}
}

function ordenarData() {
	if (dataorde == 0) {
		novaLista = "";

		novaLista += "<ul class='list-group'>";
		// Pegando os textos de assunto
		var so_texto = [];
		so_texto = pegaTexto(assunto_span);

		var aux = [];
		// for pra pegar a posição do so_texto
		for (var i = 0; i < so_texto.length; i++) {
			aux.push(i);
		}
		//console.log(aux);
		aux = ordenaData(aux);

		for (var c = 0; c < aux.length; c += 1) {
			novaLista += "<li class='list-group-item'><h4><span>" + so_texto[aux[c]] + "</span></h4>"
			novaLista += "<p><span>" + remetente[aux[c]].textContent + "</span>";
			novaLista += "<span>" + tempo[aux[c]].textContent + "</span> </p>";
			//novaLista+= "<span>" + li[aux[i]].getElementsByClassName("tempo").textContent + "</span></p></li>"; 
		}

		novaLista += "</ul>";
		document.getElementById("ordata").innerHTML = novaLista;
		dataorde = 1;
	} else {
		alert("Lista já ordenada por data");
	}
}

function pegaTexto(x) {
	var tamanho = x.length;

	//console.log(tamanho);
	var assunto_text = [];
	for (var i = 0; i < tamanho; i++) {
		assunto_text[i] = x[i].textContent;
	}

	//console.log(assunto_text);
	return assunto_text;
}

function retornaDif(x) {

	var tamanho = x.length;
	var diferentes = [];
	var isIgual = false;

	for (var i = 0; i < tamanho; i++) {
		for (var j = 0; j < diferentes.length; j++) {
			if (x[i] == diferentes[j]) {
				isIgual = true;
			}
		}
		if (!isIgual) {
			// funciona tipo o arrayList.add() do java
			diferentes.push(x[i]);
		}
		isIgual = false;
		//console.log(diferentes);
	}
	return diferentes;
}

function ordenaData(x) {
	// Pegando só o texto de datas
	var so_datas = pegaTexto(tempo);
	// console.log(tempo);
	// console.log(so_datas);
	//console.log(x);
	//console.log("antes de ordenar");
	//utiliando booble short
	for (var i = 0; i < x.length; i += 1) {
		for (var j = x.length - 1; j > i; j -= 1) {
			//pergunta para se o assunto atual de i corresponde ao assunto atual de j
			var isMenor = pegaData(so_datas[x[i]], so_datas[x[j]]);
			if (!isMenor) {
				var pote = x[i];
				x[i] = x[j];
				x[j] = pote;
			}
		}
	}
	//console.log(x);
	//console.log("depois de ordenar por data");
	return x;
}


function pegaData(data1, data2) {

	// dica
	// strDate = "12 : 40 :12";
	// arr = strDate.split(':');
	// hour = parseInt(arr[0]) + " hrs";
	// min = parseInt(arr[1]) + " min";
	// sec = parseInt(arr[2]) + " seconds";

	var dataSplit1 = data1.split(":");
	var dateObject1 = new Date();
	dateObject1.setHours(parseInt(dataSplit1[0]));
	dateObject1.setMinutes(parseInt(dataSplit1[1]));

	//console.log("um: " + dateObject1.getHours().toString());

	var dataSplit2 = data2.split(":");
	var dateObject2 = new Date();
	dateObject2.setHours(parseInt(dataSplit2[0]));
	dateObject2.setMinutes(parseInt(dataSplit2[1]));

	//console.log("dois: " + dateObject2.getHours().toString());

	//console.log("--");
	return new Date(dateObject1) < new Date(dateObject2);
}