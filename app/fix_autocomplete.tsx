"use client";

import { useEffect } from "react";
import { fix_autocomplete_inputs } from "./utils";

export default function FixAutocomplete() {
    useEffect(fix_autocomplete_inputs, []);

    return <div></div>;
}
