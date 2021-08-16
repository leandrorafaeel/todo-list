//pegando data e formatando
const dataSpan = document.querySelector(".span");
const date = new Date();

//pega data local e formata dia/mes/ano
const format = Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});
dataSpan.textContent = format.format(date);

//funcao que mostra a hora na tela e passa os segundos
function relogio() {
    const relogioSpan = document.querySelector('.span2');
    let date = new Date();
    let time = date.toLocaleTimeString();
    relogioSpan.textContent = time;
}
//acionando a funcao relogio em milisegundos como um relogio
setInterval(relogio, 1000);

//iniciando o contador de tarefas em zero
let contador = 0;

//iniciando a funcao adicionar tarefas
function addTarefas(){
    //pegando o valor digitado no input
    let input = document.querySelector(".task-value").value;
    
    //caso existe algo no input iniciar a funcao
    if(input){
        //mostrando elementos escondidos
        let titleList = document.querySelector(".list-title");
        titleList.classList.remove("hide");
        let btnCloseAll = document.querySelector(".btn-close");
        btnCloseAll.classList.remove("hide");
        
        //clonando a lista e inserido o input digitado no conteudo
        let listLi = document.querySelector(".template").cloneNode(true);
        listLi.classList.remove("hide");
        listLi.querySelector(".task-content").textContent = input;
        
        //inserindo lista criada na ul e adicinando 1 no contador
        let listUl = document.querySelector("#list").appendChild(listLi);
        contador++;

        //inserindo o numero de tarefas no elemento contador
        let contadorSpan = document.querySelector(".contador");
        if(contador === 1){
            contadorSpan.textContent = "Você só tem mais "+ contador + " tarefa pendente para hoje";
        }
        else if(contador > 1){
            contadorSpan.textContent = "Você tem "+ contador + " tarefas pendentes para hoje";
        }
        else{
            contadorSpan.textContent = "Parabéns você finalizou todas as suas tarefas";
        }

        //funcao que completa uma lista ao clicar no icone de checkado
        listLi.querySelector(".check").addEventListener("click", function(){
            if(listLi.classList.toggle("item-checked")){
                contador--;
                if(contador === 1){
                    contadorSpan.textContent = "Você tem "+ contador + " tarefa pendente para hoje";
                }
                else if(contador > 1){
                    contadorSpan.textContent = "Você tem "+ contador + " tarefas pendentes para hoje";
                }
                else{
                    contadorSpan.textContent = "Parabéns você finalizou todas as suas tarefas";
                }
            }
            else{
                contador++;
                contadorSpan.textContent = "Você tem "+ contador + " tarefas para hoje";
            } 
        });

        //funcao que deleta uma lista ao clicar no icone de lixo
        listLi.querySelector(".delete").addEventListener("click", function(){
            listLi.remove();
            contador--;
            if(contador === 1){
                contadorSpan.textContent = "Você tem "+ contador + " tarefa pendente para hoje";
            }
            else if(contador > 1){
                contadorSpan.textContent = "Você tem "+ contador + " tarefas pendentes para hoje";
            }
            else{
                contadorSpan.textContent = "Parabéns você finalizou todas as suas tarefas";
            }
        });

        //funcao apagar todas as atividades e zerando ocontador
        btnCloseAll.addEventListener("click", function(){
            listLi.remove();
            contador = 0;
            contadorSpan.textContent = " ";
            titleList.classList.add("hide");
            this.classList.add("hide")
        });

        //limpando o campo input
        document.querySelector(".task-value").value = "";   
    }
}

//ativando a funcao ao clicar no botao submit do formulario
document.querySelector(".btn-submit").addEventListener("click", function(e){
    e.preventDefault();
    addTarefas();
});