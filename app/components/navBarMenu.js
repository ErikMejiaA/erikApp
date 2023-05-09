export { NavBarMenu };
class NavBarMenu extends HTMLElement {
    constructor() {
        super();
        this.barraMenu();
    }
    barraMenu() {
        this.innerHTML = /* html */ `
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img class="logo" src="img/logo.jpg" alt="logo" srcset=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="index.html">HOME</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="team.html">TEAM</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="reclutas.html">RECLUTAS</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="skill.html">SKILL</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="moduloSkill.html">MODULO SKILL</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="evaluacion.html">EVALUACIÓN</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        `;
    }
    
}
customElements.define('nav-bar-menu', NavBarMenu);