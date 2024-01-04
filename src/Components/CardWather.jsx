import * as React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { changeResult } from '../features/WatherApi/WatherApiSlice';
import Container from '@mui/material/Container';
import { fetchWather } from '../features/WatherApi/WatherApiSlice';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment/moment';
import "moment/min/locales";
moment.locale("ar-ma");

export default function CardWather() {
    const dispatch = useDispatch();
    const tempWather = useSelector((state)=> state.wather.watherData)
    const isLoading = useSelector((state)=>  state.wather.isLoading)
    const [dateAndTime, setDateAndTime] = useState("");
    const [local, setLocal] = useState("ar")
    const { t, i18n } = useTranslation();

    function handeleChangeLang() {
        if (local == "ar") {
            setLocal(i18n.changeLanguage("en"))
            setLocal("en")
            moment.locale("en");


        } else if (local == "en") {
            setLocal(i18n.changeLanguage("ar"))
            setLocal("ar")
            moment.locale("ar-ma");
        }

        setDateAndTime(moment().format('dddd , Do MMMM YYYY'))
    }

    useEffect(() => {
        dispatch(changeResult())
        dispatch(fetchWather())
        setDateAndTime(moment().format('dddd, Do MMMM YYYY'));
        i18n.changeLanguage(local);
        
    }, []);
    return (
        <Container maxWidth="sm">
            <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div className="mb-3">
                </div>
                <div style={{
                    width: "100%",
                    backgroundColor: "#136aff",
                    color: "white",
                    padding: "10px",
                    borderRadius: "15px",
                    boxShadow: "0px 11px 1px rgba(0,0,0,0.3)"
                }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "end", justifyContent: "start" }} dir={local == "en" ? "ltl" : "rtl"}>
                            <Typography variant="h3" style={{ marginRight: "20px", fontWeight: "500" }}>
                                {t(tempWather.name)}
                            </Typography>
                            <Typography variant="h6" style={{ marginRight: "20px" }}>
                                {dateAndTime}
                            </Typography>
                        </div>
                        <hr />
                        <div style={{ display: "flex", justifyContent: "space-around" }} dir={local == "en" ? "ltl" : "rtl"}>
                            <div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {isLoading ? <CircularProgress style={{color:"white"}}/> : ""}
                                    <Typography variant="h1" style={{ textAlign: "right" }}>
                                        {tempWather.number}
                                    </Typography>
                                    {/* img */}
                                    <img src={`https://openweathermap.org/img/wn/${tempWather.icon}@2x.png`} alt="" />
                                </div>
                                <Typography variant="h6">
                                    {t(tempWather.description)}
                                </Typography>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <h5> {t("min")} : {tempWather.min}</h5>
                                    <span style={{ margin: "0px 8px" }}> | </span>
                                    <h5> {t("max")} : {tempWather.max}</h5>
                                </div>
                            </div>
                            <CloudIcon style={{ fontSize: "200", color: "white" }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end", width: "100%" }} dir={local == "en" ? "ltl" : "rtl"}>
                    <Button style={{ color: "white", marginTop: "10px" }} variant="text" onClick={handeleChangeLang}>
                        {local == "en" ? "Arabic" : "إنجليزي"}
                    </Button>
                </div>
            </div>
        </Container>
    );
}