// ==UserScript==
// @name         Autocerto - Filtro de Leads
// @version      0.1
// @description  Para agilizar o processo filtragem de leads, este código faz uma rodagem por todos os leads e pausando nos que precisam de atenção.
// @author       @jonnysundae
// ==/UserScript==

window.addEventListener('load', function() {

    var botao = document.evaluate ("/html/body[@class='page-header-fixed']/div[@class='page-container']/div[@class='page-content']/div[@class='container-fluid']/div[@class='row inbox']/div[@class='col-md-3']/div[@class='inbox-sidebar']/div[@class='acoesLead']/a[@class='btn btn-sm blue default'][2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var telefone = document.evaluate ("/html/body[@class='page-header-fixed']/div[@class='page-container']/div[@class='page-content']/div[@class='container-fluid']/div[@class='row inbox']/div[@class='col-md-3']/div[@class='inbox-sidebar']/div[@class='sale-summary detalhesLead']/div[@class='portlet-body']/ul[@class='list-unstyled']/li[2]/div[@class='sale-num']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var background= document.evaluate ("/html/body[@class='page-header-fixed']/div[@class='page-container']/div[@class='page-content']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var finalizar= document.evaluate ("/html/body[@class='page-header-fixed']/div[@class='page-container']/div[@class='page-content']/div[@class='container-fluid']/div[@class='row inbox']/div[@class='col-md-3']/div[@class='inbox-sidebar']/div[@class='acoesLead']/a[@class='btn btn-lg red default finalizarLead']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var telefone_DDD = telefone.singleNodeValue.innerText.slice(1,3);
    var duplicidade = (document.documentElement.textContent || document.documentElement.innerText).indexOf('1 Negociação');

    proximo = function(){
        botao.singleNodeValue.click();
    }

    pause = function(motivo) {
        document.body.style.setProperty("background-color", "#bb2413", "important");
        background.singleNodeValue.style.setProperty("background-color", "#bb2413", "important");
        finalizar.singleNodeValue.innerText = motivo;
        finalizar.singleNodeValue.style.fontWeight = "900";
    }


    // Se tiver mais de um lead
    if ((document.documentElement.textContent || document.documentElement.innerText).indexOf('1 Negociação') > -1){
        proximo();
    } else {
        pause("DUPLICIDADE");
    }

    // Se o DDD for diferente de 21
    if (telefone_DDD != 21){
        pause("DDD QUESTIONÁVEL");
    } else {
        proximo();
    }

});

