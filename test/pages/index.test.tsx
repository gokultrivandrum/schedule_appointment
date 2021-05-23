/* Library Imports */
import React from 'react';
import { render, cleanup } from '@testing-library/react'

/* Component Import */
import Index from '../../pages/index';
import Calendar from '../../components/calendar'

describe('Index', () => {
    beforeEach(() => {
        cleanup();
    });
    test('renders only one child', () => {
        const { container } = render(<Calendar />);
        const div = container.querySelector('div');
        expect(div).toEqual(1);
    });
});

