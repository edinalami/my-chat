import React, { Component } from 'react';
import { ConversationDto } from './chat';
import { proxy } from "./Proxy";
import { LeftPane } from './LeftPane';
import { RightPane } from './RightPane';

export class Main extends Component {
    state = { selectedConversation: undefined as (ConversationDto | undefined) };

    render() {
        let className = "main row " + (this.state.selectedConversation ? "right" : "left");
        return (
            <div className={className}>
                <LeftPane
                    inbox={proxy.inbox!}
                    selectedConversation={this.state.selectedConversation}
                    onSelect={c => this.setState({ selectedConversation: c })} />
                <RightPane conversation={this.state.selectedConversation}
                    onBack={() => this.setState({ selectedConversation: undefined })} />
            </div>
        );
    }
}