export function checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json();
    }
    
    throw new Error('Response error!');
}