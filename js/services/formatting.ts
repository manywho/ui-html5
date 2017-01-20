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
        { key: 'yyyy', value: 'YYYY' },
        { key: 'z', value: 'ZZ' },
        { key: 'zz', value: 'ZZ' },
        { key: 'zzz', value: 'ZZ' }
    ];

    let culture = 'en-US';

    return {
        initialize(flowKey) {
            if (manywho.settings.global('i18n.culture', flowKey) && numbro) {
                culture = manywho.settings.global('i18n.culture', flowKey);
            }
            else if (window.navigator && window.navigator.language && window.navigator.language.includes('-')) {
                const parts = window.navigator.language.split('-');
                const userCulture = `${parts[0].toLowerCase()}-${parts[1].toUpperCase()}`;
                if (numbro.cultures()[userCulture])
                    culture = userCulture;
                else
                    culture = 'en-US';
            }
            else
                culture = 'en-US';
        },

        format(value, format, contentType, flowKey) {
            if (!manywho.settings.global('formatting.isEnabled', flowKey, false) || manywho.utils.isNullOrWhitespace(contentType))
                return value;

            switch (contentType.toUpperCase()) {
                case manywho.component.contentTypes.datetime:
                    return manywho.formatting.dateTime(value, format, flowKey);

                case manywho.component.contentTypes.number:
                    return manywho.formatting.number(value, format, flowKey);
            }

            return value;
        },

        toMomentFormat(format: string) {
            if (!manywho.utils.isNullOrEmpty(format)) {

                if (format === 'd')
                    return 'l';
                else if (format === 'D')
                    return 'dddd, MMMM DD, YYYY';
                else if (format === 'f')
                    return 'LLLL';
                else if (format === 'F')
                    return 'dddd, LL LTS';
                else if (format === 'g')
                    return 'L LT';
                else if (format === 'G')
                    return 'L LTS';
                else if (format == 'm')
                    return 'MMMM D';
                else if (format == 'r')
                    return 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
                else if (format == 's')
                    return 'YYYY-MM-DD[T]HH:mm:ss';
                else if (format === 't')
                    return 'LT';
                else if (format === 'T')
                    return 'LTS';
                else if (format === 'u')
                    return 'YYYY-MM-DD HH:mm:ss[Z]';
                else if (format === 'U')
                    return 'dddd, LL LTS';
                else if (format == 'y')
                    return 'MMMM YYYY';

                const parts = format.split(dateTimeFormatRegex);

                if (parts) {
                    let parsedFormat = format;

                    parts.forEach(part => {
                        const mapping = dateTimeFormatMappings.find(item => item.key === part);
                        parsedFormat = mapping ? parsedFormat.replace(part, mapping.value) : parsedFormat;
                    })

                    return parsedFormat;
                }
            }

            return null;
        },

        dateTime: function(dateTime, format: string, flowKey: string) {
            if (!manywho.settings.global('formatting.isEnabled', flowKey, false))
                return dateTime;

            let offset = null;

            if (manywho.settings.global('i18n.overrideTimezoneOffset', flowKey)
                && !manywho.utils.isNullOrUndefined(manywho.settings.global('i18n.timezoneOffset', flowKey)))
                offset = manywho.settings.global('i18n.timezoneOffset', flowKey);

            if (manywho.utils.isNullOrUndefined(offset) && manywho.utils.isNullOrWhitespace(format))
                return dateTime;

            try {
                const momentFormat = manywho.formatting.toMomentFormat(format);
                const formats = [moment.ISO_8601];

                if (momentFormat)
                    formats.unshift(momentFormat);

                let parsedDateTime = offset !== null ? moment.utc(dateTime, formats) : moment(dateTime, formats);

                if (!parsedDateTime.isValid())
                    return dateTime;

                if (format != 'r' && format !== 'u')
                    parsedDateTime.utcOffset(offset);

                return parsedDateTime.format(momentFormat);
            }
            catch (ex) {
                manywho.log.error(ex);
            }

            return dateTime;
        },

        number: function(number: number | string, format: string, flowKey: string): string {
            if (manywho.utils.isNullOrWhitespace(format) || !manywho.settings.global('formatting.isEnabled', flowKey, false))
                return number.toString();

            if (typeof number === 'string' && manywho.utils.isNullOrWhitespace(number))
                return number;

            try {
                if (format.indexOf('e') !== -1 || format.indexOf('E') !== -1)
                    return (new Number(number)).toExponential();

                if (format.indexOf('c') !== -1 || format.indexOf('C') !== -1) {
                    let formattedNumber = numbro(number);
                    numbro.culture(culture);   
                    
                    formattedNumber = formattedNumber.formatCurrency(manywho.settings.global('formatting.currency', flowKey, '0[.]00'));
                    numbro.culture('en-US');
                    
                    return formattedNumber;
                }

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

                let formattedNumber = numbro(number)
                numbro.culture(culture);

                formattedNumber = formattedNumber.format(format);
                numbro.culture('en-US');
                
                return formattedNumber;
            }
            catch (ex) {
                manywho.log.error(ex);
            }

            return number.toString();
        }        
    }

})(manywho, moment);