/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;
declare var moment: any;
declare var numbro: any;

manywho.formatting = (function (manywho, moment) {

    const dateTimeFormatRegex = new RegExp('[^dmyhsztkfg]+', 'gi');
    const dateTimeFormatMappings: any = [
        { key: 'd', value: 'D' },
        { key: 'dd', value: 'DD' },
        { key: 'ddd', value: 'ddd' },
        { key: 'dddd', value: 'dddd' },
        { key: 'f', value: 'S' },
        { key: 'ff', value: 'SS' },
        { key: 'fff', value: 'SSS' },
        { key: 'ffff', value: 'SSSS' },
        { key: 'fffff', value: 'SSSSS' },
        { key: 'ffffff', value: 'SSSSSS' },
        { key: 'F', value: 'S' },
        { key: 'FF', value: 'SS' },
        { key: 'FFF', value: 'SSS' },
        { key: 'FFFF', value: 'SSSS' },
        { key: 'FFFFF', value: 'SSSSS' },
        { key: 'FFFFFF', value: 'SSSSSS' },
        { key: 'h', value: 'h' },
        { key: 'hh', value: 'hh' },
        { key: 'H', value: 'HH' },
        { key: 'HH', value: 'HH' },
        { key: 'K', value: 'Z' },
        { key: 'm', value: 'm' },
        { key: 'mm', value: 'mm' },
        { key: 'M', value: 'M' },
        { key: 'MM', value: 'MM' },
        { key: 'MMM', value: 'MMM' },
        { key: 'MMMM', value: 'MMMM' },
        { key: 's', value: 's' },
        { key: 'ss', value: 'ss' },
        { key: 't', value: 'a' },
        { key: 'tt', value: 'A' },
        { key: 'y', value: 'YY' },
        { key: 'yy', value: 'YY' },
        { key: 'yyy', value: 'YYYY' },
        { key: 'z', value: 'ZZ' },
        { key: 'zz', value: 'ZZ' },
        { key: 'zzz', value: 'ZZ' }
    ]

    numbro.language(window.navigator.language);

    return {
        format(value, format, contentType) {
            if (typeof value === 'object') {
                format = value.contentFormat;
                contentType = value.contentType;                
                value = value.contentValue;
            }

            if (manywho.utils.isNullOrWhitespace(format))
                return value;

            switch (contentType.toUpperCase()) {
                case manywho.component.contentTypes.datetime:
                    return manywho.formatting.dateTime(value, format);

                case manywho.component.contentTypes.number:
                    return manywho.formatting.number(value, format);
            }

            return value;
        },

        dateTime: function(dateTime, format: string) {
            if (manywho.utils.isNullOrWhitespace(format))
                return dateTime;

            const parsedDateTime = moment(dateTime);
            const parts = format.split(dateTimeFormatRegex);

            if (parts) {
                let parsedFormat = JSON.parse(JSON.stringify(format));

                parts.forEach(part => {
                    const mapping = dateTimeFormatMappings.find(item => item.key === part);
                    parsedFormat = mapping ? parsedFormat.replace(part, mapping.value) : parsedFormat;
                })

                return parsedDateTime.format(parsedFormat);
            }

            return dateTime;
        },

        number: function(number: Number, format: string): string {
            if (manywho.utils.isNullOrWhitespace(format))
                return number.toString();

            if (format.indexOf('e') !== -1 || format.indexOf('E') !== -1)
                return (new Number(number)).toExponential();

            if (format.indexOf('c') !== -1 || format.indexOf('C') !== -1)
                return numbro(number).formatCurrency('0[.]00', (value) => {
                    return value;
                });

            format = format.replace(/^#+\./, match => match.replace(/#/g, '0'));

            if (format.indexOf('.') !== -1) {
                const numberString = number.toString();
                const decimals = numberString.substring(numberString.indexOf('.') + 1);
                const decimalsFormat = format.substring(format.indexOf('.') + 1);

                format = format.substring(0, format.indexOf('.') + 1);

                decimalsFormat.split('').forEach((part, index) => {
                    switch (part.toUpperCase()) {
                        case '#':
                            if (index < decimals.length)
                                format += 0;
                            break;

                        case '0':
                            format += '0';
                            break;
                    }
                });
            }

            return numbro(number).format(format);
        }
    }

})(manywho, moment);