import React, { Component } from "react";
import { Button, Card, Checkbox } from "semantic-ui-react";
import { map, find, includes, remove, isEmpty } from "lodash";
import * as summaries from "./data.json";
import { searchQuery } from "./search";
import "./searchBox.scss";

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      value: [],
      cardIds: [],
      checkedIds: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCheck(e) {
    let { checkedIds } = { ...this.state };
    if (!includes(checkedIds, e)) checkedIds.push(e);
    else remove(checkedIds, e);
  }
  handleSearchChange(e) {
    console.log(e);
    if (!isEmpty(e.target.value)) {
      let resultsQuery = searchQuery(e.target.value, 3);
      this.setState({ results: resultsQuery, value: e.target.value });
    } else {
      this.setState({ results: [], value: [] });
    }
  }

  handleSubmit(e) {
    let { checkedIds, cardIds } = { ...this.state };
    cardIds = [...checkedIds];
    this.setState({ cardIds: cardIds });
  }

  render() {
    const { cardIds, results, value } = this.state;
    return (
      <div>
        {results.length ? <h3>Please click on checkbox and Submit</h3> : ""}
        <input
          style={{ margin: "10px 0px", width: "75%" }}
          value={value}
          onChange={this.handleSearchChange}
          type="text"
          placeholder="Search here"
          required
        />
        <i className="fa fa-search" aria-hidden="true"></i>
        <table className="trTable">
          <tbody>
            {map(results, m => {
              return [
                <tr key={m.id}>
                  <td className="trRow">
                    <Checkbox
                      onChange={this.handleCheck.bind(this, m.id)}
                    ></Checkbox>
                  </td>
                  <td className="trRow">{summaries.titles[m.id]}</td>
                </tr>
              ];
            })}
          </tbody>
        </table>
        <Button onClick={this.handleSubmit}>Submit</Button>
        {map(cardIds, cardId => {
          return (
            <Card.Group itemsPerRow={4}>
              <Card className="cardcontent">
                <Card.Content className="case-action-container">
                  <Card.Header>{summaries.titles[cardId]}</Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {
                        find(summaries.authors, author => {
                          return Number(author.book_id) === Number(cardId);
                        }).author
                      }
                    </span>
                  </Card.Meta>
                  {console.log(
                    find(summaries.summaries, summary => {
                      return Number(summary.id) === Number(cardId);
                    })
                  )}
                  <Card.Description>
                    {
                      find(summaries.summaries, summary => {
                        return Number(summary.id) === Number(cardId);
                      }).summary
                    }
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          );
        })}
      </div>
    );
  }
}
