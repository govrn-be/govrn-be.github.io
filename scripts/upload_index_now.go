package main

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"os"
)

// Sitemap représente la structure du sitemap XML
type Sitemap struct {
	XMLName xml.Name `xml:"urlset"`
	URLs    []URL    `xml:"url"`
}

// URL représente une URL dans le sitemap
type URL struct {
	Loc string `xml:"loc"`
}

// IndexNowRequest représente la structure de la requête à l'API IndexNow
type IndexNowRequest struct {
	Host        string   `json:"host"`
	Key         string   `json:"key"`
	KeyLocation string   `json:"keyLocation"`
	URLList     []string `json:"urlList"`
}

func main() {
	// Configuration
	sitemapPath := "dist/sitemap-0.xml"
	host := "govrn.com"
	key := "9fc4eda63a8444628f0ddfd3dcdaab7f"
	keyLocation := "https://govrn.com/9fc4eda63a8444628f0ddfd3dcdaab7f.txt"

	// Lire le fichier sitemap
	xmlFile, err := os.Open(sitemapPath)
	if err != nil {
		fmt.Printf("Erreur lors de l'ouverture du fichier sitemap: %v\n", err)
		return
	}
	defer xmlFile.Close()

	// Lire le contenu du fichier
	byteValue, err := io.ReadAll(xmlFile)
	if err != nil {
		fmt.Printf("Erreur lors de la lecture du fichier sitemap: %v\n", err)
		return
	}

	// Parser le XML
	var sitemap Sitemap
	err = xml.Unmarshal(byteValue, &sitemap)
	if err != nil {
		fmt.Printf("Erreur lors du parsing du XML: %v\n", err)
		return
	}

	// Extraire les URLs
	var urlList []string
	for _, url := range sitemap.URLs {
		urlList = append(urlList, url.Loc)
	}

	// Créer la requête IndexNow
	request := IndexNowRequest{
		Host:        host,
		Key:         key,
		KeyLocation: keyLocation,
		URLList:     urlList,
	}

	// Convertir en JSON
	jsonData, err := json.Marshal(request)
	if err != nil {
		fmt.Printf("Erreur lors de la conversion en JSON: %v\n", err)
		return
	}

	// Envoyer la requête à l'API IndexNow
	req, err := http.NewRequest("POST", "https://api.indexnow.org/IndexNow", bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Printf("Erreur lors de la création de la requête: %v\n", err)
		return
	}

	req.Header.Set("Content-Type", "application/json; charset=utf-8")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Erreur lors de l'envoi de la requête: %v\n", err)
		return
	}
	defer resp.Body.Close()

	// Vérifier la réponse
	if resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusAccepted {
		fmt.Println("Soumission IndexNow réussie")
	} else {
		body, _ := io.ReadAll(resp.Body)
		fmt.Printf("Erreur lors de la soumission IndexNow. Code: %d, Message: %s\n", resp.StatusCode, string(body))
	}
}
