import Window from '../../../src/window/Window.js';
import Document from '../../../src/nodes/document/Document.js';
import { beforeEach, describe, it, expect } from 'vitest';
import SVGFEGaussianBlurElement from '../../../src/nodes/svg-fe-gaussian-blur-element/SVGFEGaussianBlurElement.js';
import SVGLength from '../../../src/svg/SVGLength.js';
import SVGElement from '../../../src/nodes/svg-element/SVGElement.js';

describe('SVGFEGaussianBlurElement', () => {
	let window: Window;
	let document: Document;
	let element: SVGFEGaussianBlurElement;

	beforeEach(() => {
		window = new Window();
		document = window.document;
		element = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
	});

	describe('constructor()', () => {
		it('Should be an instanceof SVGFEGaussianBlurElement', () => {
			expect(element instanceof SVGFEGaussianBlurElement).toBe(true);
		});

		it('Should be an instanceof SVGElement', () => {
			expect(element instanceof SVGElement).toBe(true);
		});
	});

	describe('get static SVG_EDGEMODE_UNKNOWN()', () => {
		it('Should return 0', () => {
			expect(SVGFEGaussianBlurElement.SVG_EDGEMODE_UNKNOWN).toBe(0);
		});
	});

	describe('get static SVG_EDGEMODE_DUPLICATE()', () => {
		it('Should return 1', () => {
			expect(SVGFEGaussianBlurElement.SVG_EDGEMODE_DUPLICATE).toBe(1);
		});
	});

	describe('get static SVG_EDGEMODE_WRAP()', () => {
		it('Should return 2', () => {
			expect(SVGFEGaussianBlurElement.SVG_EDGEMODE_WRAP).toBe(2);
		});
	});

	describe('get static SVG_EDGEMODE_NONE()', () => {
		it('Should return 3', () => {
			expect(SVGFEGaussianBlurElement.SVG_EDGEMODE_NONE).toBe(3);
		});
	});

	describe('get edgeMode()', () => {
		it('Should return an instance of SVGAnimatedEnumeration', () => {
			const edgeMode = element.edgeMode;
			expect(edgeMode).toBeInstanceOf(window.SVGAnimatedEnumeration);
			expect(element.edgeMode).toBe(edgeMode);
		});

		it('Should return "duplicate" as the default value', () => {
			expect(element.edgeMode.baseVal).toBe(SVGFEGaussianBlurElement.SVG_EDGEMODE_DUPLICATE);
			expect(element.edgeMode.animVal).toBe(SVGFEGaussianBlurElement.SVG_EDGEMODE_DUPLICATE);
		});

		for (const edgeMode of ['duplicate', 'wrap', 'none']) {
			it(`Reflects the "edgeMode" attribute for "${edgeMode}"`, () => {
				const propertyName = `SVG_EDGEMODE_${edgeMode.toUpperCase()}`;

				element.setAttribute('edgeMode', edgeMode);

				expect(element.edgeMode.baseVal).toBe(SVGFEGaussianBlurElement[propertyName]);
				expect(element.edgeMode.animVal).toBe(SVGFEGaussianBlurElement[propertyName]);

				element.removeAttribute('edgeMode');

				element.edgeMode.baseVal = SVGFEGaussianBlurElement[propertyName];

				expect(element.getAttribute('edgeMode')).toBe(edgeMode);

				element.removeAttribute('edgeMode');

				// Does nothing
				element.edgeMode.animVal = SVGFEGaussianBlurElement.SVG_EDGEMODE_NONE;

				expect(element.getAttribute('edgeMode')).toBe(null);
			});
		}
	});

	describe('get height()', () => {
		it('Should return an instance of SVGAnimatedLength', () => {
			const height = element.height;
			expect(height).toBeInstanceOf(window.SVGAnimatedLength);
			expect(element.height).toBe(height);
		});

		it('Reflects the "height" attribute', () => {
			element.setAttribute('height', '10cm');

			expect(element.height.baseVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.height.baseVal.valueAsString).toBe('10cm');
			expect(element.height.baseVal.valueInSpecifiedUnits).toBe(10);

			expect(element.height.animVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.height.animVal.valueAsString).toBe('10cm');
			expect(element.height.animVal.valueInSpecifiedUnits).toBe(10);

			element.height.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20);

			expect(element.getAttribute('height')).toBe('20px');

			expect(() =>
				element.height.animVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20)
			).toThrow(
				new TypeError(
					`Failed to execute 'newValueSpecifiedUnits' on 'SVGLength': The object is read-only.`
				)
			);
		});
	});

	describe('get in1()', () => {
		it('Should return an instance of SVGAnimatedString', () => {
			const in1 = element.in1;
			expect(in1).toBeInstanceOf(window.SVGAnimatedString);
			expect(element.in1).toBe(in1);
		});

		it('Reflects the "in" attribute', () => {
			element.setAttribute('in', 'SourceGraphic');

			expect(element.in1.baseVal).toBe('SourceGraphic');
			expect(element.in1.animVal).toBe('SourceGraphic');

			element.in1.baseVal = 'BackgroundImage';

			expect(element.getAttribute('in')).toBe('BackgroundImage');

			// Does nothing
			element.in1.animVal = 'Test';

			expect(element.getAttribute('in')).toBe('BackgroundImage');
		});
	});

	describe('get result()', () => {
		it('Should return an instance of SVGAnimatedString', () => {
			const result = element.result;
			expect(result).toBeInstanceOf(window.SVGAnimatedString);
			expect(element.result).toBe(result);
		});

		it('Reflects the "result" attribute', () => {
			element.setAttribute('result', 'SourceGraphic');

			expect(element.result.baseVal).toBe('SourceGraphic');
			expect(element.result.animVal).toBe('SourceGraphic');

			element.result.baseVal = 'BackgroundImage';

			expect(element.getAttribute('result')).toBe('BackgroundImage');

			// Does nothing
			element.result.animVal = 'Test';

			expect(element.getAttribute('result')).toBe('BackgroundImage');
		});
	});

	describe('get stdDeviationX()', () => {
		it('Should return an instance of SVGAnimatedNumber', () => {
			const stdDeviationX = element.stdDeviationX;
			expect(stdDeviationX).toBeInstanceOf(window.SVGAnimatedNumber);
			expect(element.stdDeviationX).toBe(stdDeviationX);
		});

		it('Returns "2" as default value', () => {
			expect(element.stdDeviationX.baseVal).toBe(2);
			expect(element.stdDeviationX.animVal).toBe(2);
		});

		it('Reflects the "stdDeviationX" attribute', () => {
			element.setAttribute('stdDeviationX', '10');

			expect(element.stdDeviationX.baseVal).toBe(10);
			expect(element.stdDeviationX.animVal).toBe(10);

			element.stdDeviationX.baseVal = 20;

			expect(element.getAttribute('stdDeviationX')).toBe('20');

			// Does nothing
			element.stdDeviationX.animVal = 30;

			expect(element.getAttribute('stdDeviationX')).toBe('20');
		});
	});

	describe('get stdDeviationY()', () => {
		it('Should return an instance of SVGAnimatedNumber', () => {
			const stdDeviationY = element.stdDeviationY;
			expect(stdDeviationY).toBeInstanceOf(window.SVGAnimatedNumber);
			expect(element.stdDeviationY).toBe(stdDeviationY);
		});

		it('Returns "2" as default value', () => {
			expect(element.stdDeviationY.baseVal).toBe(2);
			expect(element.stdDeviationY.animVal).toBe(2);
		});

		it('Reflects the "stdDeviationY" attribute', () => {
			element.setAttribute('stdDeviationY', '10');

			expect(element.stdDeviationY.baseVal).toBe(10);
			expect(element.stdDeviationY.animVal).toBe(10);

			element.stdDeviationY.baseVal = 20;

			expect(element.getAttribute('stdDeviationY')).toBe('20');

			// Does nothing
			element.stdDeviationY.animVal = 30;

			expect(element.getAttribute('stdDeviationY')).toBe('20');
		});
	});

	describe('get width()', () => {
		it('Should return an instance of SVGAnimatedLength', () => {
			const width = element.width;
			expect(width).toBeInstanceOf(window.SVGAnimatedLength);
			expect(element.width).toBe(width);
		});

		it('Reflects the "width" attribute', () => {
			element.setAttribute('width', '10cm');

			expect(element.width.baseVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.width.baseVal.valueAsString).toBe('10cm');
			expect(element.width.baseVal.valueInSpecifiedUnits).toBe(10);

			expect(element.width.animVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.width.animVal.valueAsString).toBe('10cm');
			expect(element.width.animVal.valueInSpecifiedUnits).toBe(10);

			element.width.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20);

			expect(element.getAttribute('width')).toBe('20px');

			expect(() =>
				element.width.animVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20)
			).toThrow(
				new TypeError(
					`Failed to execute 'newValueSpecifiedUnits' on 'SVGLength': The object is read-only.`
				)
			);
		});
	});

	describe('get x()', () => {
		it('Should return an instance of SVGAnimatedLength', () => {
			const x = element.x;
			expect(x).toBeInstanceOf(window.SVGAnimatedLength);
			expect(element.x).toBe(x);
		});

		it('Reflects the "x" attribute', () => {
			element.setAttribute('x', '10cm');

			expect(element.x.baseVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.x.baseVal.valueAsString).toBe('10cm');
			expect(element.x.baseVal.valueInSpecifiedUnits).toBe(10);

			expect(element.x.animVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.x.animVal.valueAsString).toBe('10cm');
			expect(element.x.animVal.valueInSpecifiedUnits).toBe(10);

			element.x.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20);

			expect(element.getAttribute('x')).toBe('20px');

			expect(() =>
				element.x.animVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20)
			).toThrow(
				new TypeError(
					`Failed to execute 'newValueSpecifiedUnits' on 'SVGLength': The object is read-only.`
				)
			);
		});
	});

	describe('get y()', () => {
		it('Should return an instance of SVGAnimatedLength', () => {
			const y = element.y;
			expect(y).toBeInstanceOf(window.SVGAnimatedLength);
			expect(element.y).toBe(y);
		});

		it('Reflects the "y" attribute', () => {
			element.setAttribute('y', '10cm');

			expect(element.y.baseVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.y.baseVal.valueAsString).toBe('10cm');
			expect(element.y.baseVal.valueInSpecifiedUnits).toBe(10);

			expect(element.y.animVal.unitType).toBe(SVGLength.SVG_LENGTHTYPE_CM);
			expect(element.y.animVal.valueAsString).toBe('10cm');
			expect(element.y.animVal.valueInSpecifiedUnits).toBe(10);

			element.y.baseVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20);

			expect(element.getAttribute('y')).toBe('20px');

			expect(() =>
				element.y.animVal.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PX, 20)
			).toThrow(
				new TypeError(
					`Failed to execute 'newValueSpecifiedUnits' on 'SVGLength': The object is read-only.`
				)
			);
		});
	});

	describe('setStdDeviation()', () => {
		it('Should set the stdDeviationX and stdDeviationY attributes', () => {
			element.setStdDeviation(10, 20);

			expect(element.stdDeviationX.baseVal).toBe(10);
			expect(element.stdDeviationY.baseVal).toBe(20);

			expect(element.getAttribute('stdDeviationX')).toBe('10');
			expect(element.getAttribute('stdDeviationY')).toBe('20');
		});
	});
});
