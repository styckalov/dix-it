import React, {SyntheticEvent} from 'react';
import './chat.scss';
import Message, {messageParams} from "./message";
import ChatInput from "./chatInput";

interface chatState {
    value: string,
    messages: messageParams[],
}

export default class Chat extends React.Component<any, chatState> {
    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            messages: [
                {
                    id: 1,
                    creator: 'Alexander',
                    content: 'Hey there',
                    timestamp: new Date(Date.now()),
                },
                {
                    id: 2,
                    creator: 'Me',
                    content: 'Hey there 2',
                    timestamp: new Date(Date.now()),
                },
                {
                    id: 3,
                    creator: 'Me',
                    content: 'Hey there 4',
                    timestamp: new Date(Date.now()),
                },
                {
                    id: 4,
                    creator: 'Me',
                    content: 'Hey there 5',
                    timestamp: new Date(Date.now()),
                },
            ]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate() {
        const messageContainer = document.getElementsByClassName("chat__messages-area")[0];
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    renderMessages() {
        return (
            this.state.messages.map((message: messageParams, i) => {
                return (
                    <Message {...message } showArrow={this.showArrow(i)} displayCreator={this.displayCreator(i)} key={i} />
                )
            })
        );
    }

    showArrow(index: number) {
        let messages = this.state.messages;
        if (!messages[index + 1]) {
            return true;
        }
        return messages[index].creator !== messages[index + 1].creator;
    }

    displayCreator(index: number): boolean {
        let messages = this.state.messages;
        if (!messages[index - 1]) {
            return true;
        }
        return messages[index - 1].creator !== messages[index].creator;
    }

    handleSubmit(event: SyntheticEvent): void {
        event.preventDefault();
        console.log('handle submit called');

        this.state.messages.push({
            id: this.state.messages.length + 1,
            creator: 'Not me',
            content: this.state.value,
            timestamp: new Date(Date.now()),
        });

        this.setState({value: ''});

    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        console.log('handle change called');
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='chat'>
                <div className='chat__messages-area'>
                    {this.renderMessages()}
                </div>
                <ChatInput value={this.state.value} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </div>
        );
    }
};