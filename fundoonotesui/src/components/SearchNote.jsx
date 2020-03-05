import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoteServices from '../services/NoteServices';
import DisplayNotes from '../components/DisplayNotes'
const notesServices = new NoteServices()
class SearchNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNote: [],
            reverseArray: [],
        }
    }
    Search = () => {
        const keyword=this.props.posts.keyword
        notesServices.SearchNotes(keyword).then(response => {
            this.reverseArray = response.data.data.filter(note => note.isTrash === false && note.isArchive === false 
                && note.isPin === false)
            this.reverseArray.reverse()
            if (response.data.data != null) {
                this.setState({ allNote: this.reverseArray })
            }
        })
    }
    componentDidUpdate = () => {
        this.Search()
    }
  
    
    render() {
        return (
            <div>
                <div style={{ marginTop: '75px' }}>
                    <DisplayNotes  AllNotes={this.state.allNote} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state
    }
}
export default connect(mapStateToProps)(SearchNote)