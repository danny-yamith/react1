import React from 'react';
import PortfolioService from '../services/PortfolioService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

class PortfolioComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            portfolios: [],
            timesLines: [],
            open: Boolean = false,
            userName: String,
            image_url: String,
            link: String
        };
        this.editPortfolio = this.editPortfolio.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        PortfolioService.getPortfolios().then((response) => {
            this.setState({ portfolios: response.data });
        });
    }

    handleChange(event, portfolio, type) {
        var list = Array.from(this.state.portfolios);
        list.map(row => {
            if (row.idportfolio === portfolio.idportfolio) {
                switch (type) {
                    case 1: row.description = event.target.value;
                        break;
                    case 2: row.names = event.target.value;
                        break;
                    case 3: row.last_names = event.target.value;
                        break;
                    default:
                        break;
                }
            }
        });
        this.setState({ portfolios: list });
        return;
    }

    handleClickOpen = (portfolio) => {
        this.setState({
            open: true,
            userName: portfolio.twitter_user_name,
            image_url: portfolio.image_url,
            link: "https://twitter.com/" + portfolio.twitter_user_name
        });

        PortfolioService.getTimesLines(portfolio.twitter_user_name).then((response) => {
            this.setState({ timesLines: response.data });
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    editPortfolio(portfolio) {
        PortfolioService.updatePortfolio(portfolio);
    }

    render() {
        return (
            <div>
                <h1 className="text-center"> Portfolio List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>

                            <td>Photo</td>
                            <td>Description</td>
                            <td>Names</td>
                            <td>Last_Names</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.portfolios.map(
                                portfolio =>
                                    <tr key={portfolio.idportfolio}>
                                        <td>
                                            <div>
                                                <img width="100" height="150" src={portfolio.image_url} alt="photo" />
                                            </div>
                                        </td>
                                        <td><textarea value={portfolio.description} onChange={(e) => this.handleChange(e, portfolio, 1)}></textarea></td>
                                        <td><textarea value={portfolio.names} onChange={(e) => this.handleChange(e, portfolio, 2)}></textarea></td>
                                        <td><textarea value={portfolio.last_names} onChange={(e) => this.handleChange(e, portfolio, 3)}></textarea></td>
                                        <td>
                                            <button onClick={() => this.editPortfolio(portfolio)}>Update</button>
                                            <button onClick={() => this.handleClickOpen(portfolio)}>Twitter</button>
                                        </td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{this.state.userName} Time Line</DialogTitle>
                    <DialogContent>
                        <a href={this.state.link} target="_blank">{this.state.link}</a>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>Photo</td>
                                    <td>User</td>
                                    <td>Description</td>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.timesLines.map(
                                        timeLine =>
                                            <tr>
                                                <td>
                                                    <div>
                                                        <img width="80" height="120" src={this.state.image_url} alt="photo" />
                                                    </div>
                                                </td>
                                                <td>{timeLine.user.name}</td>
                                                <td>{timeLine.text}</td>
                                            </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default PortfolioComponent