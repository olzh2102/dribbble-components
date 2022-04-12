import { renderHook, mockNavigatorGeolocation } from '@common/test/test-utils';

import useCurrentLocation from './use-current-location-coordinates';

const coords = {
  latitude: 51.1,
  longitude: 45.3,
};

describe('use current location hook', () => {
  function setup() {
    const { getCurrentPositionMock } = mockNavigatorGeolocation();
    getCurrentPositionMock.mockImplementation((success) => {
      success({ coords });
    });

    return renderHook(() => useCurrentLocation());
  }

  it('should set current location coordinates', () => {
    const { result } = setup();

    expect(result.current.coord.lat).toEqual(coords.latitude);
    expect(result.current.coord.lon).toEqual(coords.longitude);
  });
});
