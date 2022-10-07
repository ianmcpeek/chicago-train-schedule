import React, { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import RecordForm from "../forms/RecordForm";
import Record from "../models/Record";
import FormInput from "./FormInput";
import './RecordModal.css';

interface RecordModalProps {
    open: boolean;
    editRecord: Record | null;
    fnOnClose: () => void;
    fnOnCreate: (form: RecordForm) => void;
}

function emptyForm() {
    return {
        train: '',
        route: '',
        routeNumber: '',
        operatorId: ''
    }
}

function RecordModal({ open, editRecord, fnOnCreate, fnOnClose }: RecordModalProps) {
    
    const [form, setForm] = useState<RecordForm>(emptyForm());

    useEffect(() => {        
        if (editRecord == null) {
            setForm(emptyForm())
        } else {
            setForm({
                train: editRecord.train,
                route: editRecord.route,
                routeNumber: editRecord.routeNumber,
                operatorId: editRecord.operatorId,
            });
        }
    }, [editRecord]);
    
    const onTrainChanged = useCallback((train: string) => {
        const updatedForm = { ...form };
        updatedForm.train = train;
        setForm(updatedForm);        
    }, [form]);

    function onRouteChanged(route: string) {
        const updatedForm = { ...form };
        updatedForm.route = route;
        setForm(updatedForm);        
    }

    function onRouteNumberChanged(routeNumber: string) {
        const updatedForm = { ...form };
        updatedForm.routeNumber = routeNumber;
        setForm(updatedForm);        
    }

    function onOperatorIdChanged(operatorId: string) {
        const updatedForm = { ...form };
        updatedForm.operatorId = operatorId;
        setForm(updatedForm);        
    }

    function onSubmit(e: any) {
        fnOnCreate(form);
        setForm(emptyForm());
        e.preventDefault();
    }

    function onClose() {
        setForm(emptyForm());
        fnOnClose();
    }

    return (
        !open ? null : 
        <div className="dimmer">
            <div className="modal">
                <div className="modal__content">
                    <div className="row close">
                        <button className="close-button" onClick={onClose}>Close X</button>
                    </div>
                    <h2>{ editRecord !== null ? 'Edit Record' : 'Create Record'}</h2>
                    <form>
                        <FormInput id="train" label="Train" value={form.train} fnOnChange={onTrainChanged} ></FormInput>
                        <FormInput id="route" label="Route" value={form.route} fnOnChange={onRouteChanged} ></FormInput>
                        <FormInput id="routeNumber" label="Route Number" value={form.routeNumber} fnOnChange={onRouteNumberChanged} ></FormInput>
                        <FormInput id="operatorId" label="Operator ID" value={form.operatorId} fnOnChange={onOperatorIdChanged} ></FormInput>
                        <button className='create-button' type="submit" onClick={onSubmit}>Confirm</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default RecordModal;