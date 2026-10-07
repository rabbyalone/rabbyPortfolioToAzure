Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)

# High Quality Rendering settings
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

# Bullet and separator characters
$bullet = [char]0x2022
$sep = " " + [char]0x2022 + " "

# Helper function to create rounded rectangle path
function Get-RoundedRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

# 1. Background: Executive Dark Studio Environment
# Dark carbon/slate radial ambient studio background
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF 0, 0),
    (New-Object System.Drawing.PointF $width, $height),
    [System.Drawing.Color]::FromArgb(15, 18, 25),
    [System.Drawing.Color]::FromArgb(7, 8, 12)
)
$g.FillRectangle($bgBrush, 0, 0, $width, $height)
$bgBrush.Dispose()

# Studio overhead spotlight glow
$topGlowBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF 600, 0),
    (New-Object System.Drawing.PointF 600, 320),
    [System.Drawing.Color]::FromArgb(28, 212, 175, 55),
    [System.Drawing.Color]::FromArgb(0, 7, 8, 12)
)
$g.FillRectangle($topGlowBrush, 0, 0, $width, 320)
$topGlowBrush.Dispose()

# Studio Desk Surface horizon line
$deskLinePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(18, 255, 255, 255), 1)
$g.DrawLine($deskLinePen, 0, 565, $width, 565)
$deskLinePen.Dispose()

# 2. Business Card Geometry
# Centered, perfectly proportioned executive card (920 x 504 px)
$cardX = 140
$cardY = 63
$cardW = 920
$cardH = 504
$cardRadius = 18

# Multi-layer realistic physical drop shadows
for ($i = 32; $i -ge 1; $i -= 3) {
    $alpha = [int](3.2 * (34 - $i))
    if ($alpha -gt 50) { $alpha = 50 }
    $sBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 0, 0, 0))
    $sOffset = [int]($i * 0.95)
    $sPath = Get-RoundedRectPath ($cardX - $i * 0.5) ($cardY + $sOffset) ($cardW + $i) ($cardH + $i * 0.5) ($cardRadius + $i * 0.3)
    $g.FillPath($sBrush, $sPath)
    $sPath.Dispose()
    $sBrush.Dispose()
}

# Contact shadow directly beneath card edge
$contactBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(140, 0, 0, 0))
$contactPath = Get-RoundedRectPath ($cardX + 8) ($cardY + 14) ($cardW - 16) ($cardH - 6) $cardRadius
$g.FillPath($contactBrush, $contactPath)
$contactPath.Dispose()
$contactBrush.Dispose()

# 3. Business Card Surface: Ultra-Premium Matte Obsidian Stock
$cardPath = Get-RoundedRectPath $cardX $cardY $cardW $cardH $cardRadius
$cardGradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF $cardX, $cardY),
    (New-Object System.Drawing.PointF ($cardX + $cardW), ($cardY + $cardH)),
    [System.Drawing.Color]::FromArgb(21, 25, 34),
    [System.Drawing.Color]::FromArgb(10, 12, 17)
)
$g.FillPath($cardGradBrush, $cardPath)
$cardGradBrush.Dispose()

# Tactile Paper Finish: Subtle Micro Diagonal Texture
$g.SetClip($cardPath)
$texturePen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(6, 255, 255, 255), 1)
for ($tx = $cardX - $cardH; $tx -le ($cardX + $cardW + $cardH); $tx += 22) {
    $g.DrawLine($texturePen, $tx, $cardY, ($tx + $cardH), ($cardY + $cardH))
}
$texturePen.Dispose()

# Warm subtle light sheen across card face
$sheenBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF $cardX, $cardY),
    (New-Object System.Drawing.PointF ($cardX + 500), ($cardY + 300)),
    [System.Drawing.Color]::FromArgb(15, 255, 245, 220),
    [System.Drawing.Color]::FromArgb(0, 0, 0, 0)
)
$g.FillRectangle($sheenBrush, $cardX, $cardY, $cardW, $cardH)
$sheenBrush.Dispose()
$g.ResetClip()

# 4. Card Edges & Premium Foil Borders
# Outer Champagne Gold Hairline Border
$goldBorderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(160, 212, 175, 55), 1.5)
$g.DrawPath($goldBorderPen, $cardPath)
$goldBorderPen.Dispose()

# Inner Refined Inset Border
$insetMargin = 14
$insetPath = Get-RoundedRectPath ($cardX + $insetMargin) ($cardY + $insetMargin) ($cardW - $insetMargin * 2) ($cardH - $insetMargin * 2) ($cardRadius - 4)
$insetPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(45, 212, 175, 55), 1)
$g.DrawPath($insetPen, $insetPath)
$insetPen.Dispose()
$insetPath.Dispose()

# Top specular edge light (physical 600 GSM card thickness reflection)
$bevelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(85, 255, 255, 255), 1)
$g.DrawLine($bevelPen, ($cardX + $cardRadius), ($cardY + 1), ($cardX + $cardW - $cardRadius), ($cardY + 1))
$bevelPen.Dispose()

# Left edge subtle specular highlight
$leftBevelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(45, 255, 255, 255), 1)
$g.DrawLine($leftBevelPen, ($cardX + 1), ($cardY + $cardRadius), ($cardX + 1), ($cardY + $cardH - $cardRadius))
$leftBevelPen.Dispose()

# 5. Monogram Crest & Brand Header (Top Left)
$crestX = $cardX + 48
$crestY = $cardY + 42
$crestSize = 54

# Gold Crest Path (squircle with gold double border)
$crestPath = Get-RoundedRectPath $crestX $crestY $crestSize $crestSize 12

$crestBgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF $crestX, $crestY),
    (New-Object System.Drawing.PointF ($crestX + $crestSize), ($crestY + $crestSize)),
    [System.Drawing.Color]::FromArgb(48, 40, 24),
    [System.Drawing.Color]::FromArgb(22, 19, 13)
)
$g.FillPath($crestBgBrush, $crestPath)
$crestBgBrush.Dispose()

$crestBorderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(230, 212, 175, 55), 1.5)
$g.DrawPath($crestBorderPen, $crestPath)
$crestBorderPen.Dispose()

# Inner subtle crest border
$innerCrestPath = Get-RoundedRectPath ($crestX + 4) ($crestY + 4) ($crestSize - 8) ($crestSize - 8) 8
$innerCrestPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80, 212, 175, 55), 1)
$g.DrawPath($innerCrestPen, $innerCrestPath)
$innerCrestPen.Dispose()
$innerCrestPath.Dispose()
$crestPath.Dispose()

# Monogram "RH" inside crest (refined serif)
$crestFont = New-Object System.Drawing.Font ("Georgia", 21, [System.Drawing.FontStyle]::Bold)
$crestBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(250, 230, 165))
$crestSf = New-Object System.Drawing.StringFormat
$crestSf.Alignment = [System.Drawing.StringAlignment]::Center
$crestSf.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString("RH", $crestFont, $crestBrush, ($crestX + $crestSize / 2), ($crestY + $crestSize / 2 + 1), $crestSf)
$crestBrush.Dispose()
$crestFont.Dispose()

# Brand Kicker next to crest
$kickerFont = New-Object System.Drawing.Font ("Segoe UI", 10.5, [System.Drawing.FontStyle]::Bold)
$kickerBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(212, 175, 85))
$g.DrawString("ENGINEERING & ARCHITECTURE LEADERSHIP", $kickerFont, $kickerBrush, ($crestX + $crestSize + 18), ($crestY + 7))
$kickerFont.Dispose()
$kickerBrush.Dispose()

$kickerSubFont = New-Object System.Drawing.Font ("Segoe UI", 9.5, [System.Drawing.FontStyle]::Regular)
$kickerSubBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(148, 163, 184))
$kickerSubText = "ENTERPRISE PLATFORMS $sep CLOUD ARCHITECTURE $sep SCALABILITY"
$g.DrawString($kickerSubText, $kickerSubFont, $kickerSubBrush, ($crestX + $crestSize + 18), ($crestY + 28))
$kickerSubFont.Dispose()
$kickerSubBrush.Dispose()

# Top Right: Executive Status Pill
$statusX = $cardX + $cardW - 204
$statusY = $cardY + 46
$statusW = 156
$statusH = 32
$statusPill = Get-RoundedRectPath $statusX $statusY $statusW $statusH 16
$statusBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(30, 16, 185, 129))
$g.FillPath($statusBg, $statusPill)
$statusBg.Dispose()
$statusBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(110, 16, 185, 129), 1)
$g.DrawPath($statusBorder, $statusPill)
$statusBorder.Dispose()
$statusPill.Dispose()

# Status Glowing Dot
$dotGlow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(80, 52, 211, 153))
$g.FillEllipse($dotGlow, ($statusX + 11), ($statusY + 9), 12, 12)
$dotGlow.Dispose()

$dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(52, 211, 153))
$g.FillEllipse($dotBrush, ($statusX + 13), ($statusY + 11), 8, 8)
$dotBrush.Dispose()

$statusFont = New-Object System.Drawing.Font ("Segoe UI", 9, [System.Drawing.FontStyle]::Bold)
$statusTextBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(209, 250, 229))
$g.DrawString("AVAILABLE FOR HIRE", $statusFont, $statusTextBrush, ($statusX + 28), ($statusY + 9))
$statusFont.Dispose()
$statusTextBrush.Dispose()

# 6. Center Stage: Name and Title
$nameY = $cardY + 130
$nameFont = New-Object System.Drawing.Font ("Segoe UI", 43, [System.Drawing.FontStyle]::Bold)

# Foil Emboss Effect: Subtle dark deboss shadow beneath the letters
$debossBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 0, 0, 0))
$g.DrawString("MD RABBY HASAN", $nameFont, $debossBrush, ($cardX + 49), ($nameY + 2))
$debossBrush.Dispose()

# Gold foil gradient for the name
$nameBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF ($cardX + 48), $nameY),
    (New-Object System.Drawing.PointF ($cardX + 620), $nameY),
    [System.Drawing.Color]::FromArgb(255, 246, 206),
    [System.Drawing.Color]::FromArgb(212, 175, 55)
)
$g.DrawString("MD RABBY HASAN", $nameFont, $nameBrush, ($cardX + 48), $nameY)
$nameBrush.Dispose()
$nameFont.Dispose()

# Title
$titleY = $nameY + 63
$titleFont = New-Object System.Drawing.Font ("Segoe UI", 18.5, [System.Drawing.FontStyle]::Regular)
$titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(232, 238, 246))
$g.DrawString("Lead Software Engineer & Systems Architect", $titleFont, $titleBrush, ($cardX + 50), $titleY)
$titleFont.Dispose()
$titleBrush.Dispose()

# Decorative Gold Foil Divider Rule
$ruleY = $titleY + 45
$ruleW = $cardW - 96
$ruleBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
    (New-Object System.Drawing.PointF ($cardX + 48), $ruleY),
    (New-Object System.Drawing.PointF ($cardX + 48 + $ruleW), $ruleY),
    [System.Drawing.Color]::FromArgb(210, 212, 175, 55),
    [System.Drawing.Color]::FromArgb(35, 212, 175, 55)
)
$rulePen = New-Object System.Drawing.Pen ($ruleBrush, 1.5)
$g.DrawLine($rulePen, ($cardX + 48), $ruleY, ($cardX + 48 + $ruleW), $ruleY)
$rulePen.Dispose()
$ruleBrush.Dispose()

# Center diamond on divider line
$diaSize = 4
$diaPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$diaX = $cardX + 48 + ($ruleW / 2)
$diaPath.AddPolygon(@(
    (New-Object System.Drawing.PointF $diaX, ($ruleY - $diaSize)),
    (New-Object System.Drawing.PointF ($diaX + $diaSize), $ruleY),
    (New-Object System.Drawing.PointF $diaX, ($ruleY + $diaSize)),
    (New-Object System.Drawing.PointF ($diaX - $diaSize), $ruleY)
))
$diaBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(240, 212, 175, 55))
$g.FillPath($diaBrush, $diaPath)
$diaBrush.Dispose()
$diaPath.Dispose()

# 7. Core Competencies & Architecture Disciplines
$specY = $ruleY + 18
$specFont = New-Object System.Drawing.Font ("Segoe UI", 12.5, [System.Drawing.FontStyle]::Regular)
$specBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(203, 213, 225))
$specText = "Distributed Systems $sep Cloud Platforms $sep .NET 8 $sep AI Engineering $sep High-Scale APIs"
$g.DrawString($specText, $specFont, $specBrush, ($cardX + 50), $specY)
$specFont.Dispose()
$specBrush.Dispose()

# 8. Contact & Credentials Cards / Footer Row
$footerY = $cardY + 342
$boxH = 92
$boxSpacing = 16
$boxW = [int](($cardW - 96 - ($boxSpacing * 2)) / 3)

function Draw-ContactBox([float]$bx, [float]$by, [float]$bw, [float]$bh, [string]$label, [string]$val, [string]$sub) {
    $bPath = Get-RoundedRectPath $bx $by $bw $bh 10
    $bBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(20, 255, 255, 255))
    $g.FillPath($bBg, $bPath)
    $bBg.Dispose()
    
    $bBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(40, 212, 175, 55), 1)
    $g.DrawPath($bBorder, $bPath)
    $bBorder.Dispose()
    $bPath.Dispose()
    
    # Label
    $lblFont = New-Object System.Drawing.Font ("Segoe UI", 8.5, [System.Drawing.FontStyle]::Bold)
    $lblBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(195, 165, 95))
    $g.DrawString($label.ToUpper(), $lblFont, $lblBrush, ($bx + 16), ($by + 12))
    $lblFont.Dispose()
    $lblBrush.Dispose()
    
    # Value
    $valFont = New-Object System.Drawing.Font ("Segoe UI", 12.5, [System.Drawing.FontStyle]::Bold)
    $valBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(241, 245, 249))
    $g.DrawString($val, $valFont, $valBrush, ($bx + 16), ($by + 32))
    $valFont.Dispose()
    $valBrush.Dispose()
    
    # Sub
    $subFont = New-Object System.Drawing.Font ("Segoe UI", 9.5, [System.Drawing.FontStyle]::Regular)
    $subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(148, 163, 184))
    $g.DrawString($sub, $subFont, $subBrush, ($bx + 16), ($by + 58))
    $subFont.Dispose()
    $subBrush.Dispose()
}

# Box 1: Direct Email
$box1X = $cardX + 48
$box1Sub = "Priority Response $sep Technical Inquiries"
Draw-ContactBox $box1X $footerY $boxW $boxH "Direct Contact" "rabbyalone@gmail.com" $box1Sub

# Box 2: Portfolio & Web
$box2X = $box1X + $boxW + $boxSpacing
$box2Sub = "Architecture Dossier $sep Live Projects"
Draw-ContactBox $box2X $footerY $boxW $boxH "Official Portfolio" "rabbyhasan.com.bd" $box2Sub

# Box 3: Location & Links
$box3X = $box2X + $boxW + $boxSpacing
$box3Sub = "github.com/rabbyalone $sep linkedin"
Draw-ContactBox $box3X $footerY $boxW $boxH "Base & Profiles" "Dhaka / USA (Remote)" $box3Sub

# 9. Bottom Micro Footnote
$footFont = New-Object System.Drawing.Font ("Segoe UI", 8.5, [System.Drawing.FontStyle]::Regular)
$footBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(100, 116, 139))
$footText = "MD RABBY HASAN $sep SYSTEMS ARCHITECT & LEAD ENGINEER $sep rabbyhasan.com.bd"
$g.DrawString($footText, $footFont, $footBrush, ($cardX + 50), ($cardY + $cardH - 25))
$footFont.Dispose()
$footBrush.Dispose()

# Save High Quality JPEG (Quality 96)
$jpgPath = "d:\My\rabbyPortfolioToAzure\rabbyPortfolioToAzure\portfolio-v2\public\img\og-preview.jpg"
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]96)

$bmp.Save($jpgPath, $encoder, $encoderParams)

# Also copy to dist if dist exists
$distPath = "d:\My\rabbyPortfolioToAzure\rabbyPortfolioToAzure\portfolio-v2\dist\img\og-preview.jpg"
if (Test-Path "d:\My\rabbyPortfolioToAzure\rabbyPortfolioToAzure\portfolio-v2\dist\img") {
    $bmp.Save($distPath, $encoder, $encoderParams)
}

$cardPath.Dispose()
$encoderParams.Dispose()
$g.Dispose()
$bmp.Dispose()

Write-Output "SUCCESS: og-preview.jpg regenerated cleanly"
