ALTER TABLE public."hod-workdone"
ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone NULL;

ALTER TABLE public."hod-workdone_reject"
ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone NULL;
