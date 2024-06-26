class CartHandling {
    constructor() {
        this.cart = new CartCreation();
    }

    cartHandlingEvents() {
        this.cartCreationEvent();
        this.addToCartEvent();
        this.removeFromCartEvent();
    }

    cartCreationEvent() {
        $('#cart-view').on('click', () => {
            this.getCartItems();
        });
    }

    getCartItems() {
        let self = this;

        $.ajax({
            url: "http://localhost/theShop/API/index.php?resource=cart",
            method: "GET"
        })
            .done((response) => {
                self.cart.fillCart(response.cart)


            })
            .fail(function (error) {
                self.showError(error);
            });

    }

    addToCartEvent() {
        let self = this;
        $('#cart-output').on('click', 'button[name="AddButton"]', function () {
            let HTTPVerb = "POST";
            let url = $(this).attr('value');
            self.manipulateItems(url, HTTPVerb);

        });
    }

    removeFromCartEvent() {
        let self = this;
        $('#cart-output').on('click', 'button[name="RemoveButton"]', function () {
            let HTTPVerb = "DELETE";
            let url = $(this).attr('value');
            self.manipulateItems(url, HTTPVerb);
        });
    }


    manipulateItems(url, HTTPVerb) {
        let self = this;

        $.ajax({
            url: url,
            method: HTTPVerb
        })
            .done(() => {
                self.getCartItems();

            })
            .fail(function (error) {
                self.showError(error);
            });
    }

    showError(error) {
        console.error(error);
    }
}