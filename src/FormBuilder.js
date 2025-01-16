import React, { useState } from 'react';
import { PlusCircle, Trash2, MoveUp, MoveDown, Star, Calendar, Upload, Clock } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const RatingPreview = ({ maxStars, value }) => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <Star key={i} className={`w-5 h-5 ${i <= value ? 'text-yellow-400' : 'text-gray-300'}`} />
        );
    }

    return <div className="flex gap-1">{stars}</div>;
};

const FormBuilder = () => {
    const [formFields, setFormFields] = useState([]);
    const [formTitle, setFormTitle] = useState('Nouveau Formulaire');
    const [previewMode, setPreviewMode] = useState(false);

    const fieldTypes = [
        { id: 'text', label: 'Texte court', icon: null },
        { id: 'textarea', label: 'Texte long', icon: null },
        { id: 'number', label: 'Nombre', icon: null },
        { id: 'email', label: 'Email', icon: null },
        { id: 'tel', label: 'Téléphone', icon: null },
        { id: 'select', label: 'Liste déroulante', icon: null },
        { id: 'checkbox', label: 'Case à cocher', icon: null },
        { id: 'date', label: 'Date', icon: <Calendar className="w-4 h-4" /> },
        { id: 'file', label: 'Fichier', icon: <Upload className="w-4 h-4" /> },
        { id: 'rating', label: 'Étoiles', icon: <Star className="w-4 h-4" /> },
        { id: 'timeslot', label: 'Créneau', icon: <Clock className="w-4 h-4" /> }
    ];

    const generateTimeSlots = (startTime, endTime, interval) => {
        const slots = [];
        let currentTime = new Date(`2000-01-01T${startTime}`);
        const endDateTime = new Date(`2000-01-01T${endTime}`);

        while (currentTime <= endDateTime) {
            slots.push(
                currentTime.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
            );
            currentTime.setMinutes(currentTime.getMinutes() + interval);
        }
        return slots;
    };

    const addField = (type) => {
        const newField = {
            id: Date.now(),
            type,
            label: 'Nouveau champ',
            required: false,
            options: type === 'select' ? ['Option 1'] : [],
            maxStars: type === 'rating' ? 5 : null,
            acceptedFiles: type === 'file' ? '.pdf,.doc,.docx' : null,
            timeSettings: type === 'timeslot' ? {
                startTime: '09:00',
                endTime: '18:00',
                interval: 30,
                excludedTimes: []
            } : null
        };
        setFormFields([...formFields, newField]);
    };

    const updateField = (id, updatedData) => {
        setFormFields(formFields.map(field =>
            field.id === id ? { ...field, ...updatedData } : field
        ));
    };

    const removeField = (id) => {
        setFormFields(formFields.filter(field => field.id !== id));
    };

    const moveField = (index, direction) => {
        const newFields = [...formFields];
        const [movedField] = newFields.splice(index, 1);
        newFields.splice(index + direction, 0, movedField);
        setFormFields(newFields);
    };

    const FormField = ({ field, index }) => {
        const [ratingValue, setRatingValue] = useState(0);

        if (previewMode) {
            if (field.type === 'timeslot') {
                const timeSlots = generateTimeSlots(
                    field.timeSettings.startTime,
                    field.timeSettings.endTime,
                    field.timeSettings.interval
                ).filter(slot => !field.timeSettings.excludedTimes.includes(slot));

                return (
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <select className="w-full p-2 border rounded" required={field.required}>
                            <option value="">Sélectionnez un créneau</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            }

            return (
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                        <textarea
                            className="w-full p-2 border rounded"
                            required={field.required}
                            placeholder={`Entrez ${field.label.toLowerCase()}`}
                        />
                    ) : field.type === 'select' ? (
                        <select className="w-full p-2 border rounded" required={field.required}>
                            <option value="">Sélectionnez une option</option>
                            {field.options.map((opt, i) => (
                                <option key={i}>{opt}</option>
                            ))}
                        </select>
                    ) : field.type === 'checkbox' ? (
                        <input
                            type="checkbox"
                            required={field.required}
                            className="ml-2"
                        />
                    ) : field.type === 'date' ? (
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                            required={field.required}
                        />
                    ) : field.type === 'file' ? (
                        <input
                            type="file"
                            className="w-full p-2 border rounded"
                            required={field.required}
                            accept={field.acceptedFiles}
                        />
                    ) : field.type === 'rating' ? (
                        <RatingPreview
                            maxStars={field.maxStars}
                            value={ratingValue}
                        />
                    ) : (
                        <input
                            type={field.type}
                            className="w-full p-2 border rounded"
                            required={field.required}
                            placeholder={`Entrez ${field.label.toLowerCase()}`}
                        />
                    )}
                </div>
            );
        }

        return (
            <Card className="mb-4">
                <CardContent className="pt-6">
                    <div className="flex gap-4 mb-4">
                        <input
                            type="text"
                            value={field.label}
                            onChange={e => updateField(field.id, { label: e.target.value })}
                            className="flex-grow p-2 border rounded"
                            placeholder="Nom du champ"
                        />
                        <Select
                            value={field.type}
                            onValueChange={value => updateField(field.id, { type: value })}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {fieldTypes.map(type => (
                                    <SelectItem key={type.id} value={type.id}>
                                        <div className="flex items-center gap-2">
                                            {type.icon}
                                            {type.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {field.type === 'timeslot' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Heure de début:</label>
                                    <input
                                        type="time"
                                        value={field.timeSettings.startTime}
                                        onChange={e => updateField(field.id, {
                                            timeSettings: {
                                                ...field.timeSettings,
                                                startTime: e.target.value
                                            }
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Heure de fin:</label>
                                    <input
                                        type="time"
                                        value={field.timeSettings.endTime}
                                        onChange={e => updateField(field.id, {
                                            timeSettings: {
                                                ...field.timeSettings,
                                                endTime: e.target.value
                                            }
                                        })}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">
                                    Intervalle (minutes):
                                </label>
                                <Select
                                    value={field.timeSettings.interval.toString()}
                                    onValueChange={value => updateField(field.id, {
                                        timeSettings: {
                                            ...field.timeSettings,
                                            interval: parseInt(value)
                                        }
                                    })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un intervalle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[15, 30, 45, 60].map(interval => (
                                            <SelectItem key={interval} value={interval.toString()}>
                                                {interval} minutes
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">
                                    Créneaux exclus:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {generateTimeSlots(
                                        field.timeSettings.startTime,
                                        field.timeSettings.endTime,
                                        field.timeSettings.interval
                                    ).map(slot => (
                                        <label key={slot} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={field.timeSettings.excludedTimes.includes(slot)}
                                                onChange={(e) => {
                                                    const newExcludedTimes = e.target.checked
                                                        ? [...field.timeSettings.excludedTimes, slot]
                                                        : field.timeSettings.excludedTimes.filter(t => t !== slot);
                                                    updateField(field.id, {
                                                        timeSettings: {
                                                            ...field.timeSettings,
                                                            excludedTimes: newExcludedTimes
                                                        }
                                                    });
                                                }}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">{slot}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={field.required}
                                onChange={e => updateField(field.id, { required: e.target.checked })}
                                className="mr-2"
                            />
                            Obligatoire
                        </label>
                        <div className="flex-grow" />
                        <button
                            onClick={() => index > 0 && moveField(index, -1)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                            disabled={index === 0}
                        >
                            <MoveUp className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => index < formFields.length - 1 && moveField(index, 1)}
                            className="p-2 text-gray-600 hover:text-gray-800"
                            disabled={index === formFields.length - 1}
                        >
                            <MoveDown className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => removeField(field.id)}
                            className="p-2 text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>
                        <input
                            type="text"
                            value={formTitle}
                            onChange={e => setFormTitle(e.target.value)}
                            className="w-full p-2 text-2xl font-bold border-none focus:outline-none"
                        />
                    </CardTitle>
                </CardHeader>
            </Card>

            <div className="flex justify-between mb-6">
                <div className="flex flex-wrap gap-2">
                    {fieldTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => addField(type.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                        >
                            {type.icon}
                            + {type.label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    {previewMode ? 'Mode édition' : 'Aperçu'}
                </button>
            </div>

            <div>
                {formFields.map((field, index) => (
                    <FormField key={field.id} field={field} index={index} />
                ))}
            </div>

            {previewMode && formFields.length > 0 && (
                <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Envoyer
                </button>
            )}
        </div>
    );
};

export default FormBuilder;
