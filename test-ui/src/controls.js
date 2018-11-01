const ADMIN_ROLE = 'FEEDS_ADMIN';
export default class Controls {
    constructor(tokenLookupFn) {
        this.element = document.createElement('div');
        this.token = null;
        this.isAdmin = false;
        this.tokenLookupFn = tokenLookupFn;
        /**
         * customroles: array,
         * display: name
         * user: user name
         *
         */
        this.render();
    }

    render() {
        let controlsForm = `
            <form class='form-inline'>
                <div class='form-group mx-sm-3 mb-2'>
                    <label for="token-input">Set your CI auth token </label>
                    <input type="password" class="form-control" id="token-input">
                </div>
                <button type="submit" class="btn btn-primary mb-2">Submit</button>
            </form>
            <div id='token-response'></div>
            <div id='feed-input' style='display: none'>input!</div>
        `;
        this.element.innerHTML = controlsForm;
        this.element.querySelector('.btn').onclick = e => {
            e.preventDefault();
            this.tokenLookupFn(document.getElementById('token-input').value);
        }
    }

    renderTokenInfo(token) {
        console.log(token);
        let adminMsg = '';
        if (token.customroles.includes(ADMIN_ROLE)) {
            this.isAdmin = true;
            adminMsg = `<br>You're an admin, and can post global messages.`;
            this.element.querySelector('#feed-input').style.display = 'inline';
        }
        let message = `
            <div class="alert alert-success">
                Hi <b>${token.display}</b> (${token.user}), your token is valid.${adminMsg}
            </div>
        `;
        this.element.querySelector('#token-response').innerHTML = message;
    }

    renderTokenError() {
        let error = `
            <div class="alert alert-danger" role="alert">
                An error occurred - your token might not be valid.
            </div>
        `;
        this.element.querySelector('#token-response').innerHTML = error;
    }
}

//6YC7NL232MOYOF67L2TMHXTZYHJC3VBW