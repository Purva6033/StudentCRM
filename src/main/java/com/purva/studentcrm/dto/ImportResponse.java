package com.purva.studentcrm.dto;

public class ImportResponse {

    private int imported;

    private int duplicate;

    private int failed;

    public ImportResponse() {
    }

    public ImportResponse(int imported, int duplicate, int failed) {
        this.imported = imported;
        this.duplicate = duplicate;
        this.failed = failed;
    }

    public int getImported() {
        return imported;
    }

    public void setImported(int imported) {
        this.imported = imported;
    }

    public int getDuplicate() {
        return duplicate;
    }

    public void setDuplicate(int duplicate) {
        this.duplicate = duplicate;
    }

    public int getFailed() {
        return failed;
    }

    public void setFailed(int failed) {
        this.failed = failed;
    }

}