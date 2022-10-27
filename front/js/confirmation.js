// fonction qui récupère le contenu de l'URL qui se situe après "orderId=", puis insère cette donnée dans le DOM
function getOrderId(){
    let searchParams = new URL(location.href).searchParams
    let orderId = searchParams.get("orderId") // récupère l'orderId dans l'URL
    document.querySelector("#orderId").innerText = orderId // insère l'orderId dans le DOM
}
getOrderId()