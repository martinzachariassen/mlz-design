// swift-tools-version: 5.9
import PackageDescription

// MLZ Design — the SwiftUI token layer. Colour, type, spacing, radius and motion
// generated from the same source of truth as the web package (`bun run gen:swift`),
// so native iOS/macOS apps inherit the exact MLZ palette.
let package = Package(
    name: "MLZDesign",
    platforms: [.iOS(.v16), .macOS(.v13)],
    products: [
        .library(name: "MLZDesign", targets: ["MLZDesign"])
    ],
    targets: [
        .target(name: "MLZDesign")
    ]
)
