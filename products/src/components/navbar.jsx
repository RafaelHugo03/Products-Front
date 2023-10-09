export default function NavBar()
{
    return(
        <nav>
            <div className="nav-wrapper blue-grey">
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="/">Usuários</a></li>
                <li><a href="products">Produtos</a></li>
                </ul>
            </div>
        </nav>
    )
}