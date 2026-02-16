export async function fetchFunc(url) {
    const result =  await fetch(url)
        
    if(!result.ok) {
        throw new Error(`Error: ${result.status}`)
    }

    return result.json();
    
}