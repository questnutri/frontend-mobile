import { IPatient } from "../models/Patient/Patient.interface"
import { fetchWithAuth } from "./fetchWithAuth"
import { IMeal } from "../models/Patient/Diet/Diet.interface"

export const fetchPatients = async (): Promise<IPatient[]> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient`, {
            method: 'GET',
        })

        if (response.ok) {
            return await response.json()
        }

        return []
    } catch (error) {
        console.error('Error fetching patients:', error)
        return []
    }
}

interface IFetchOnePatientResponse {
    status: number
    data?: IPatient
}

export const fetchOnePatient = async (id: string): Promise<any> => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient/${id}`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch patient data')
        }

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch patient')
    }
}


export const updateOnePatient = async (id: string, data: Partial<IPatient>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}

export const updatePatientMeal = async (idPatient: string, idDiet: string, idMeal: string, data: Partial<IMeal>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient/${idPatient}/diet/${idDiet}/meal/${idMeal}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        // console.log(await response.json())

    } catch (error) {

    }
}

export const createPatient = async (data: Partial<IPatient>) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient/`, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}

export const deletePatient = async (idPatient: string) => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/nutritionist/patient/${idPatient}`, {
            method: 'DELETE',
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        return {
            status: 500,
            data: 'Application error'
        }
    }
}

export const fetchSelfPatient = async () => {
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/patient`, {
            method: 'GET',
        })

        if (response.status !== 200) {
            throw new Error('Could not fetch patient data')
        }


        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch patient')
    }
}

export const checkMeal = async (mealId: string) => {
    console.log(mealId)
    try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL || 'http://172.20.10.12:3030/api/v1'}/patient/meal/${mealId}`, {
            method: 'POST',
        })

        return {
            status: response.status,
            data: await response.json()
        }

    } catch (error) {
        console.error(error)
        throw new Error('Could not fetch patient')
    }
}