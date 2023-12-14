# SP_Medical_Group
 
<script>




var usuariosDB = [
    { usuario: "macedolivia803@gmail.com", senha: "123" },
    { usuario: "27948535039", senha: "4321" },
    { usuario: "30632214066", senha: "5678" },
    { usuario: "29715601049", senha: "8675" },
];

var usuarioValidar;
var senhaValidar;

function Entrar() {
   

    usuarioValidar = document.getElementById("email").value;
    senhaValidar = document.getElementById("senha").value;

    let usuarioAchado = usuariosDB.find(user => user.usuario === usuarioValidar)
    let senhaAchada = usuariosDB.find(password => password.senha === senhaValidar)

    console.log(usuarioAchado)

    if (usuarioAchado == undefined && senhaAchada == undefined) {
        
        window.alert("Usuário ou senha incorretos.")
    } else if (usuarioAchado == undefined) {
        
        window.alert("Usuário ou senha incorretos.")
    } else if (senhaAchada == undefined) {
       
        window.alert("Usuário ou senha incorretos")
    } else {
        
        window.alert("Login correto!")
        window.location.assign("../html/InicioPaciente.html")
    }
}
</script>
