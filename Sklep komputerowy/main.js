document.addEventListener("DOMContentLoaded", () => {
    // Płynne przewijanie do sekcji
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Koszyk zakupowy
    const cart = [];
    const cartContainer = document.createElement("div");
    cartContainer.id = "cart";
    cartContainer.innerHTML = "<h2>Koszyk</h2><ul id='cart-items'></ul><p id='total-price'>Razem: 0 PLN</p>";
    document.body.appendChild(cartContainer);

    document.querySelectorAll(".product").forEach(product => {
        const button = document.createElement("button");
        button.innerText = "Dodaj do koszyka";
        button.classList.add("add-to-cart");
        product.appendChild(button);
        
        button.addEventListener("click", () => {
            const name = product.querySelector("h3").innerText;
            const priceText = product.querySelector("strong").innerText;
            const price = parseFloat(priceText.replace("Cena: ", "").replace(" PLN", ""));
            
            cart.push({ name, price });
            updateCart();
        });
    });

    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            const li = document.createElement("li");
            li.innerText = `${item.name} - ${item.price} PLN`;
            cartItems.appendChild(li);
        });
        document.getElementById("total-price").innerText = `Razem: ${total} PLN`;
    }

    // Walidacja formularza kontaktowego
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            if (name === "" || email === "" || message === "") {
                alert("Wszystkie pola muszą być wypełnione!");
                return;
            }
            
            if (!email.includes("@")) {
                alert("Wprowadź poprawny adres email!");
                return;
            }
            
            alert("Wiadomość wysłana! Dziękujemy za kontakt.");
            form.reset();
        });
    }
});
