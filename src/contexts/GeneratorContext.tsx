import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { isValidJson } from '../helpers/validators';
import { formatJson, jsonToTypescript } from '../helpers/generator';
import { copyToClipboard } from '../helpers/helpers';

interface GeneratorContextType {
    responseInput: string
    setResponseInput: Dispatch<SetStateAction<string>>
    generate: () => void
    error: null | string
    result: string
    clearResponse: () => void
    clearAll: () => void
    formatResponse: () => void
    copyResponse: () => Promise<boolean>
    copyResult: () => Promise<boolean>
    updateSettings: (key: string, value: string) => void
    userSettings: SettingsItem[]
}

interface SettingsItem {

    id: string;
    label: string;
    values: string[];
    value: string;

}

export const init_settings: SettingsItem[] = [
    {
        id: 'type-definition-style',
        label: "Type Definition Style",
        values: ["type", "interface"],
        value: "interface"
    },
    {
        id: 'export-types',
        label: "Export Types",
        values: ["Yes", "No"],
        value: "Yes"
    },
]

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined);

export function GeneratorProvider({ children }: { children: ReactNode }) {

    const [responseInput, setResponseInput] = useState("")
    const [result, setResult] = useState("")
    const [error, setError] = useState<null | string>(null)

    const [userSettings, setUserSettings] = useState(init_settings)

    const updateSettings = (key: string, value: string) => {
        const settingsInstance = [...userSettings]
        const index = settingsInstance.findIndex(s => s.id === key)
        let updatable = settingsInstance[index]
        updatable.value = value
        setUserSettings(settingsInstance)
    }


    const generate = () => {

        setError(null)
        const isValidInput = isValidJson(responseInput)

        if (!isValidInput) {
            setError("Invalid JSON")
            return;
        }

        const definitionStyleSettings = userSettings.find(s => s.id === 'type-definition-style')

        const definitionStyle = definitionStyleSettings ? definitionStyleSettings.value : 'interface'

        const exportTypesSettings = userSettings.find(s => s.id === 'export-types')

        const includeExport = exportTypesSettings ? exportTypesSettings.value === 'Yes' ? true : false : true

        setResult(jsonToTypescript(responseInput, "Root", definitionStyle, includeExport))


    }

    const clearResponse = () => {
        setResponseInput("")
    }

    const clearAll = () => {
        setResponseInput("")
        setResult("")
        setError("")
    }

    const formatResponse = () => {


        setError(null)
        const isValidInput = isValidJson(responseInput)

        if (!isValidInput) {
            setError("Invalid JSON")
            return;
        }


        const formatted = formatJson(responseInput)
        setResponseInput(formatted)
    }

    const copyResponse = async () => {

        if (responseInput.length === 0) {
            return false;
        }



        return await copyToClipboard(responseInput)
    }

    const copyResult = async () => {

        if (result.length === 0) {
            return false;
        }


        return await copyToClipboard(result)
    }

    const values: GeneratorContextType | undefined = {
        responseInput,
        setResponseInput,
        generate,
        error,
        result,
        clearResponse,
        formatResponse,
        copyResponse,
        copyResult,
        userSettings,
        updateSettings,
        clearAll
    }



    return (
        <GeneratorContext.Provider value={values}>
            {children}
        </GeneratorContext.Provider>
    );
}

export function useGenerator() {
    const context = useContext(GeneratorContext);
    if (context === undefined) {
        throw new Error('useGenerator must be used within an GeneratorProvider');
    }
    return context;
}