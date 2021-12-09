import React from 'react'
import AnyChart from 'anychart-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TripsService from '../services/TripsService';
import Button from '@mui/material/Button';
import ReactLoading from 'react-loading';
import { Section, Title, Article, Prop, list } from "./generic";

class TripsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            legend: false,
            data1: [],
            data2: [],
        };
        this.handleLegendChange = this.handleLegendChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleImport = this.handleImport.bind(this);
    }

    componentDidMount() {
        TripsService.getPromTrips().then((response) => {
            console.log(response);
            var dataRes = [];
            if(response.data !== null && response.data !== undefined && response.data !==''){
                response.data.forEach(element => {
                    var rowRes = [2];
                    rowRes[0] = element.regionName;
                    rowRes[1] = element.regionTotal;
    
                    dataRes.push(rowRes);
                });
                this.setState({ data1: dataRes });
            }
        });

        TripsService.getWeekly(2018).then((response) => {
            var dataRes = [];
            if(response.data !== null && response.data !== undefined && response.data !==''){
                response.data.forEach(element => {
                    var rowRes = [2];
                    rowRes[0] = element.name_region;
                    rowRes[1] = element.count_week;
    
                    dataRes.push(rowRes);
                });
                this.setState({ data2: dataRes });
                }
        });
    }

    handleLegendChange(e) {
        this.setState({
            legend: e.target.checked
        });
    }

    handleImport() {
        this.refs.fileUploader.click();
    };

    handleInput(event) {
        var selectedFile = event.target.files[0];

        const data = new FormData();
        data.append('file', selectedFile);

        TripsService.processFile(data).then((response) => {
            console.log(response);
        });
    };

    render() {
        return (
            <div>
                <Tabs>
                    <h1>TRIPS</h1>
                    <Button onClick={this.handleImport}>Import</Button>
                    <input type="file" id="file" ref="fileUploader" onChange={this.handleInput} style={{ display: "none" }} />
                    <TabList>
                        <Tab>Trips By Region</Tab>
                        <Tab>Weekly Average By Region</Tab>
                    </TabList>

                    <TabPanel>
                        <AnyChart width={900} height={700} title="Trips By Region" type="pie" data={this.state.data1} />
                    </TabPanel>

                    <TabPanel>
                        <AnyChart width={900} height={700} title="Weekly Average By Region" type="pie" data={this.state.data2} />
                    </TabPanel>
                </Tabs>
                <Section>
                    <Article>
                        <ReactLoading type='spin' color="#fff" />
                        <Prop>Loading...</Prop>
                    </Article>
                </Section>
            </div>
        )
    }
}

export default TripsComponent