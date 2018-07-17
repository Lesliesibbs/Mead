import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUser } from '../../actions/user_actions'
import { authorRecentStories } from '../../reducers/selectors'
import FollowButton from './follow_button'

class QuickLook extends React.Component {

  constructor (props) {
    super(props)
    this.state = { 
      loading: true,
      classes: 'quick-look show'
    }

    this.handleUnmounting = this.handleUnmounting.bind(this)
  }

  componentDidMount () {
    this.props.fetchUser(this.props.authorId).then(
      success => this.setState({ loading: false })
    )
  }

  handleUnmounting () {
    this.setState({ classes: 'quick-look' }, () => {
      setTimeout(this.props.hidePop, 200)
    })
  }

  render () {

    if (this.state.loading) {
      return <div className="quick-look"></div>
    }

    const author = this.props.author
    const recentStories = this.props.recentStories

    const recentStoriesLinks = recentStories.map((story, i) => {
      const storyURL = `/stories/${story.id}`
      return (
        <Link key={i} to={storyURL}>
          <h1 className="quick-look-story">{story.title}</h1>
        </Link>
      )
    })

    return (
      <div 
        className={this.state.classes}
        onMouseLeave={this.handleUnmounting}>
        <div className="quick-look-content">
          <h1 className="quick-look-name">{author.name}</h1>
          <h1 className="quick-look-userSince">{author.userSince}</h1>

          {recentStoriesLinks}

          <div className="flex">
            <h1 className="quick-look-followCount">{author.numFollowers}</h1>
            <FollowButton user={author} addClasses="quick-look-follow" />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const author = state.entities.users[ownProps.authorId]
  const recentStories = authorRecentStories(state, author)
  return {
    author,
    recentStories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickLook)