import { TwilioSession } from "./types";
import {Client} from '@twilio/conversations';

const SAMPLE_USER="TEST_USER1";
const SAMPLE_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2JhYTIyNmZjMWJhMWYyMjU0YWQwOTZlZmIzYWZjZDE1LTE2NjMxMzAxNjQiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJURVNUX1VTRVIxIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTYzNkZjlmNjU1ZTgzNDE1ZTliZjdlZjQ4NTk5NTc1YmQifX0sImlhdCI6MTY2MzEzMDE2NCwiZXhwIjoxNjYzMTMzNzY0LCJpc3MiOiJTS2JhYTIyNmZjMWJhMWYyMjU0YWQwOTZlZmIzYWZjZDE1Iiwic3ViIjoiQUM2ZGM3ODA3MWU2OWE5MTg0NWFhNzE3ODM2ODdiNTA2ZSJ9.RC6mE5R7opHt2v1jumZ4D0G0rmsQmebMy9huPHqbwFs";
                    
export const useTwilioSession = (): TwilioSession => ({
    user: SAMPLE_USER,
    token: SAMPLE_TOKEN,
    client: new Client(SAMPLE_TOKEN)
})
