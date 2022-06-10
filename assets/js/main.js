class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".formulario");

    this.eventos();
  }
  eventos() {
    this.formulario.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const checkedFields = this.isValid();
    const checkedPasswords = this.isValidPassword();

    if (checkedFields && checkedPasswords) {
      alert("Formulário Enviado com Sucesso!");
      this.formulario.submit();
    }
  }

  isValidPassword() {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetir-senha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.createError(
        senha,
        "Campos senha e repetir senha precisam ser iguais"
      );
      this.createError(
        repetirSenha,
        "Campos senha e repetir senha precisam ser iguais"
      );
    }
    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.createError(senha, "Senha precisa ter entre 6 a 12 caracteres");
    }

    return valid;
  }

  isValid() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll(".error-text")) {
      errorText.remove();
    }
    for (let field of this.formulario.querySelectorAll(".validar")) {
      const label = field.previousElementSibling.innerHTML;
      if (!field.value) {
        this.createError(field, `Campo ${label} não pode estar em branco.`);
        valid = false;
      }
      if (field.classList.contains("cpf")) {
        if (!this.validaCPF(field)) valid = false;
      }
      if (field.classList.contains("usuario")) {
        if (!this.validaUsuario(field)) valid = false;
      }
    }
    return valid;
  }

  validaUsuario(field) {
    const usuario = field.value;
    let valid = true;
    if (usuario.length > 12 || usuario.length < 3) {
      this.createError(field, "Usuário precisa ter entre 3 e 12 caracteres");
      valid = false;
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(
        field,
        "Nome de usuário precisa conter apenas letras e/ou números"
      );
      valid = false;
    }

    return valid;
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);
    if (!cpf.valida()) {
      this.createError(field, "CPF inválido");
      return false;
    }
    return true;
  }

  createError(field, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    field.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
