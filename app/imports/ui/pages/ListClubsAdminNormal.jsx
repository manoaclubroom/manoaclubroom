import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Clubs } from '/imports/api/club/club';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubAdminNormal from '/imports/ui/components/ClubAdminNormal';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubsAdminNormal extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Club</Header>
          <Card.Group>
            {this.props.clubs.map((club, index) => <ClubAdminNormal key={index} club ={club} />)}
          </Card.Group>

        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListClubsAdminNormal.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('ClubsAdminNormal');
  return {
    clubs: Clubs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListClubsAdminNormal);
