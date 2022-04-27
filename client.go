ackage main

import (
    "os"
    "log"
    "net/http"
    "time"
    "io/ioutil"
)

func fetch(client *http.Client, url string) {
        resp, err := client.Get(url)
        if err != nil {
                        log.Printf("Failed to get url %v", err)
                        return
        }

        log.Printf("Fetched page, response code: %v", resp.StatusCode)
        defer resp.Body.Close()
        ioutil.ReadAll(resp.Body)
}

func main() {
    url := os.Getenv("URL")
    waitPeriod := 375000 * time.Millisecond

                tr := &http.Transport{
                        DisableKeepAlives:   false,
                }
                client := &http.Client{Transport: tr}

    for times := 1; times < 20000; times++ {
        log.Printf("Fetch page " + url + " wait period: " + waitPeriod.String())
        fetch(client, url)
        time.Sleep(waitPeriod)
    }
}