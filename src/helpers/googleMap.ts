export const getGooglePlaceName = (fieldValue: unknown) => {
  if (!fieldValue) return fieldValue
  if (typeof fieldValue === 'string') return fieldValue
  const placeResult = fieldValue as google.maps.places.PlaceResult
  return `${placeResult?.formatted_address ?? ''}`
}

export const extractAddressComponent = (fieldValue: google.maps.places.PlaceResult | null | undefined) => {
  if (!fieldValue) return null
  if (!fieldValue?.address_components) return null

  const addressComponents: GoogleMapExtractedComponents = fieldValue.address_components.reduce((prev, component) => {
    const componentType = component.types[0]

    switch (componentType) {
      case 'subpremise': {
        const unitData = component.long_name.split(' ')

        return { ...prev, unitNumber: unitData[1] ?? unitData[0], unitType: unitData.length > 1 ? unitData[0] : null }
      }

      case 'street_number':
        return { ...prev, street: prev.street ? `${component.long_name} ${prev.street ?? ''}` : component.long_name }

      case 'route':
        return { ...prev, route: component.long_name }

      case 'postal_code':
        return { ...prev, postalCode: `${component.long_name}${prev.postalCode ?? ''}` }

      case 'postal_code_suffix':
        return { ...prev, postalCode: `${prev.postalCode ?? ''}-${component.long_name}` }

      case 'sublocality_level_1':
      case 'locality':
        return { ...prev, suburb: component.long_name }

      case 'administrative_area_level_1': {
        return { ...prev, state: component.short_name }
      }
      case 'country':
        return { ...prev, country: component.long_name }
    }

    return prev
  }, {} as GoogleMapExtractedComponents)

  return addressComponents
}

export interface GoogleMapExtractedComponents {
  unitNumber: string | null
  unitType: string | null
  street: string | null
  route: string | null
  suburb: string | null
  state: string | null
  postalCode: string | null
  country: string | null
}
