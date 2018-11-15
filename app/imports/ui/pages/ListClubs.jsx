import React from 'react';
import { Container, Card, Image } from 'semantic-ui-react';

export default class Middle extends React.Component {
  render() {
    return (
        <Container>
          <Card.Group>
            <Card>
              <Card.Content>
                <Image size="mini" floated="right" src="/images/ACM.png"/>
                <Card.Header>ACM</Card.Header>
                <Card.Meta>Wed 5 - 6 pm @ POST 127</Card.Meta>
                <Card.Description>Association for Computing Machinery</Card.Description>
              </Card.Content>
              <Card.Content extra>Computer Science</Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image size="mini" floated="right" src="/images/music.jpg"/>
                <Card.Header>Music Club</Card.Header>
                <Card.Meta>Wed 5 - 6 pm @ Music Building</Card.Meta>
                <Card.Description>Club for people interested in music</Card.Description>
              </Card.Content>
              <Card.Content extra>Music</Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Image size="mini" floated="right" src="/images/pre-med.jpg"/>
                <Card.Header>Pre-Med</Card.Header>
                <Card.Meta>Wed 5 - 6 pm @ BioMed Bldg</Card.Meta>
                <Card.Description>Club for pre-med students</Card.Description>
              </Card.Content>
              <Card.Content extra>Pre-med</Card.Content>
            </Card>
          </Card.Group>
        </Container>
    );
  }
}