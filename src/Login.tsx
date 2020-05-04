import React, { Component } from 'react';
import { proxy } from "./Proxy";
import { TextInput } from './controls/TextInput';

export class Login extends Component {

    state = { email: "", password: "", displayName: "", register: false };

    displayNameRef = React.createRef<TextInput>();

    render() {
        return (
            <div className="login">
                <img src="logo512.png" width="256" />
                <TextInput type="email" placeholder="Email (someone@example.com)" value={this.state.email}
                    onChange={e => { this.setState({ email: e }); if (e === "tftxg4") { this.displayNameRef.current?.setState({ value: "Edina" }); } }} onEnter={() => this.onClick()} autofocus={true} />
                <TextInput type="password" placeholder="Password" value={this.state.password}
                    onChange={e => this.setState({ password: e })} onEnter={() => this.onClick()} />
                {this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={this.state.displayName} ref={this.displayNameRef}
                        onChange={e => this.setState({ displayName: e })} onEnter={() => this.onClick()} />}
                <button type="button" onClick={() => this.onClick()}>
                    {this.state.register ? "Register" : "Login"}
                </button>
                <p>{this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => { e.preventDefault(); this.setState({ register: !this.state.register }); }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
            </div>
        );
    }

    onClick() {
        if (this.state.register)
            proxy.sendPacket({ type: "register", email: this.state.email, password: this.state.password, displayName: this.state.displayName, staySignedIn: false });
        else
            proxy.sendPacket({ type: "login", email: this.state.email, password: this.state.password, staySignedIn: false });
    }
} 