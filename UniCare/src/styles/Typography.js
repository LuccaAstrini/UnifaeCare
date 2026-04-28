import { Platform } from 'react-native';
import {
    FONT_FAMILY_BOLD,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_REGULAR,
    FONT_SIZE_HEADER,
    FONT_SIZE_LARGE,
    FONT_SIZE_MEDIUM,
    FONT_SIZE_SMALL,
    FONT_SIZE_TITLE
} from './Fonts';


const lh = (size, multiplier = 1.5) =>
    Platform.OS === 'ios' ? size * multiplier : undefined;

export const typography = {
    header: { fontFamily: FONT_FAMILY_BOLD, fontSize: FONT_SIZE_HEADER, lineHeight: lh(FONT_SIZE_HEADER, 1.3) },
    title: { fontFamily: FONT_FAMILY_BOLD, fontSize: FONT_SIZE_TITLE, lineHeight: lh(FONT_SIZE_TITLE, 1.3) },
    bodyLarge: { fontFamily: FONT_FAMILY_REGULAR, fontSize: FONT_SIZE_LARGE, lineHeight: lh(FONT_SIZE_LARGE) },
    bodyMedium: { fontFamily: FONT_FAMILY_REGULAR, fontSize: FONT_SIZE_MEDIUM, lineHeight: lh(FONT_SIZE_MEDIUM) },
    label: { fontFamily: FONT_FAMILY_MEDIUM, fontSize: FONT_SIZE_MEDIUM, lineHeight: lh(FONT_SIZE_MEDIUM, 1.4) },
    caption: { fontFamily: FONT_FAMILY_REGULAR, fontSize: FONT_SIZE_SMALL, lineHeight: lh(FONT_SIZE_SMALL, 1.4) },
    captionBold: { fontFamily: FONT_FAMILY_BOLD, fontSize: FONT_SIZE_SMALL, lineHeight: lh(FONT_SIZE_SMALL, 1.4) },
};