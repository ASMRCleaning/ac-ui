export async function questionnaireForm(houseType, size, empty, furnished, pet, bedrooms, bath, dens, frequency) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questionnaire`, {
      method: "POST",
  
      body: JSON.stringify({ 
        houseType: houseType, 
        size: size,
        empty: empty,
        furnished: furnished,
        pet: pet,
        bedrooms: bedrooms,
        bath: bath,
        dens: dens,
        frequency: frequency,
     }),
  
      headers: {
        "content-type": "application/json",
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  }