import React, { Component } from 'react';
import { InboxDto, ConversationDto } from './chat';
import { proxy } from "./Proxy";
import { ConversationCard } from './ConversationCard';
import { TextInputAndButton } from './TextInputAndButton';

export class LeftPane extends Component<{
    inbox: InboxDto, selectedConversation: ConversationDto | undefined,
    onSelect: (c: ConversationDto) => void
}>
{
    render() {
        return (
            <div className="left-pane">
                <p className="my-tag">My tag: {this.props.inbox.user.tag}</p>
                <TextInputAndButton type="text" placeholder="Add user by Tag (Name#123)"
                    buttonContent="Inv"
                    onClick={text => this.sendContactRequest(text)} />
                <div className="conversations">
                    {this.props.inbox.conversations.map(x =>
                        <ConversationCard
                            key={x.channelId}
                            conversation={x}
                            selected={x === this.props.selectedConversation}
                            onSelect={() => this.props.onSelect(x)} />)}
                </div>
            </div>
        );
    }

    sendContactRequest(email: string) {
        proxy.sendPacket({ type: "contactRequest", email, firstMessage: "Hello" });
        return true;
    }

    componentDidMount() {
        proxy.addEventListener("conversation", c => this.forceUpdate(), this);
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }
}