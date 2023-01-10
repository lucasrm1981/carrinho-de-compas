// Exemplo de produtos já prenchidos no carrinho
var list = [
	{"desc":"Blusa Azul", "amount":"1", "value":"55.40"},
	{"desc":"Calça Jeans", "amount":"3", "value":"100.99"},
	{"desc":"Camisa Branca", "amount":"9", "value":"25.00"}
];


//somando total
function getTotal(list){
	var total = 0;
	for(var key in list){
		total += list[key].value * list[key].amount;
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
}

//criando a tabela
function setList(list){
	var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Editar</button> <button class="btn btn-default" onclick="deleteData('+key+');">Remover</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

//formatando o nome do produto
function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

//formatando a quantidade
function formatAmount(amount){
	return parseInt(amount);
}

//formatando o preço
function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "R$ " + str;
	return str;
}

//adicionar novo produto
function addData(){
	if(!validation()){
		return;
	}
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"desc":desc , "amount":amount , "value":value });
	setList(list);
}

//botões de editar
function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//limpa os campos de editar
function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";
}

//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc, "amount":amount, "value":value};
	resetForm();
	setList(list);
}

//deletando os dados
function deleteData(id){
	if(confirm("Apagar este Item?")){
		if(id === list.length - 1){
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

//validando e printando erros caso os inputs venham sem valores
function validation(){
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	document.getElementById("errors").style.display = "none";

	if(desc === ""){
		errors += '<p>Descrição</p>';
	}
	if(amount === ""){
		errors += '<p>Quantidade</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Quantidade</p>';
	}
	if(value === ""){
		errors += '<p>Valor</p>';
	}else if(value != parseFloat(value)){
		errors += '<p>Valor</p>';
	}

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Campos Obrigatórios:</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deleteList(){
	if (confirm("Deseja Apagar a Lista?")){
		list = [];
		setList(list);
	}
}

//salvando em storage
function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

//verifica se já tem algo salvo
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();